
# Introduction

CAuto is a simple command line tool for _automatic compile and link C++ projects_.

CAuto aims at speeding up the workflow when managing targets and source code in a C++ project. Thus, CAuto uses an easy naming convention to automatically setup executables and libraries by scanning your source tree. Just drop in your files, configure dependencies and build.

Using CAuto doesnt keep you off the important work - implementing your project. Create new targets for executables and libraries is as easy as creating a new file and run CAuto.

CAuto relies on _bash_, _CMake_ and _g++_.

- _bash_  is used to run CAuto.
- _CMake_ manages dependencies (scans headers and uses _FindPackage.cmake_ scripts).
- _g++_   is used to scan source files.

CAuto is in development. Many things need to be extended and moved to config files. However it already can be used to setup C++ executables and libraries with only a few commands on the command line. It works and is simple.

Feedback and contributions are welcome.

# Using CAuto

## Install

CAuto only consists of a script and a CMake file. To install simply do:

> $`git clone https://github.com/lehmann7/cauto`
> $`cd cauto`
> $`make PREFIX=/usr/local install`

or if you only want to see whats going to happen do:

> $`make -n PREFIX=/usr/local install`

After installation test if CAuto is in your path:

> $`cauto`

This should print the help page of CAuto.

## Setup Project

To setup a project at first create a new folder and then use Cauto to init the project:

> $`mkdir myproj`
> $`cd myproj`
> $`cauto init`

Now the project is initialized and looks like this:

> $`ls`
> `build/`
> `conf/`
> `CMakeLists.txt`

`build/` will contain all compiled binaries (object files, executables, libraries) and `conf/` the project configuration (compiler flags, linker flags and dependencies).

## Setup Source Tree

The source tree consists of four folders:

* `inc/` - include dir, headers of the project
* `src/` - source dir, implementation
* `exe/` - executable dir
* `so/` - library dir

Depending on where you put a file, it is going to be compiled into an object file, an executable or a library. Object files are handled by CMake in `build/CMakeFiles/*`. Executables and libraries are created in `build/` using the same basename of the file relative to `exe/` or `so/`.

### Example Executable

Lets make an example executable and enable C++11:

> $`echo "MyProject" >> conf/project`
> $`echo "-std=c++11" >> conf/cxxflags`
> $`mkdir -p exe/filesystem`
> $`wget -O exe/filesystem/simple_ls.cpp http://lehmann7.github.io/example/simple_ls.cpp`
> $`cauto scan`

Now CAuto tells you some information about the project and that it has found a new target `filesystem_simple_ls` which corresponds to the source file `exe/filesystem/simple_ls.cpp`.

Using `cauto make` you can build the executable. However it will not work, since _boost::filesystem_ is not header-only and needs to be linked against a shared object. Since setting build configuration manually is annoying, CAuto uses CMake find scripts to configure compile and link dependencies.

To tell CAuto to use _boost::filesystem_ just do the following:

> $`echo "ADD_PACKAGE(Boost Boost REQUIRED COMPONENTS system filesystem)" >> conf/package.cmake`
> $`echo "Boost" >> conf/filesystem/package`
> $`cauto scan make`

Now the target `filesystem_simple_ls` should compile and link into `build/filesystem/simple_ls`. The configuration mechanism of CAuto is explained in the section _Configure Project_ below.

### Example Library

After we have created an example executable, lets extend the project by an example library:

> $`mkdir -p inc/mymath`
> $`mkdir -p src/mymath`
> $`mkdir -p so/mymath`
> $`wget -O inc/mymath/factorial.h http://lehmann7.github.io/example/factorial.h`
> $`wget -O inc/mymath/crossprod3.h http://lehmann7.github.io/example/crossprod3.h`
> $`wget -O src/mymath/factorial.cpp http://lehmann7.github.io/example/factorial.cpp`
> $`wget -O src/mymath/crossprod3.cpp http://lehmann7.github.io/example/crossprod3.cpp`
> $`wget -O so/mymath/mymath.cpp http://lehmann7.github.io/example/mymath.cpp`
> $`cauto scan make`

Now CAuto rescans and builds the project. You can check the resulting shared object by:

> $`nm build/mymath/mymath.so | c++-filt | tail -n 2`

## Configure Project

The project configuration is located in `conf/`. The configuration is based on the following files:

* `conf/project` - name of project
* `conf/package.cmake` - external dependencies of project, use CMake find scripts
* `conf/foo/bar/cxxflags` - additional compiler flags for all targets `foo_bar_*`
* `conf/foo/bar/ldflags` - additional linker flags for all targets `foo_bar_*`
* `conf/foo/bar/package` - packages to be used by targets for all targets `foo_bar_*`
* `conf/foo/bar/<NAME>.cxxflags` - additional compiler flags for target `foo_bar_<NAME>`
* `conf/foo/bar/<NAME>.ldflags` - additional linker flags for `foo_bar_<NAME>`
* `conf/foo/bar/<NAME>.package` - packages to be used by targets for `foo_bar_<NAME>`

### Project Name

`conf/project` simply contains the name of the project and is passed to the CMake command `PROJECT(...)`. You can set it up by:

> $`echo "MyProjectName" > conf/project`

### External Packages

`conf/package.cmake` contains CMake commands to setup external dependencies using CMake find scripts. To do so the command

> `ADD_PACKAGE(<VAR_SUFFIX> <FIND_PACKAGE_ARGS...>)`

has to be used. `ADD_PACKAGE(...)` wraps the CMake command `FIND_PACKAGE(...)` and requires the find script to setup the following CMake variables:

* `<VAR_SUFFIX>_INCLUDE_DIRS` - include directories of package
* `<VAR_SUFFIX>_LIBRARIES` - library of package
* `<VAR_SUFFIX>_DEFINITIONS` - definitions of package

Notice that the `<VAR_SUFFIX>` is the first argument of `ADD_PACKAGE(...)`, whereas all the other arguments are directly passed to `FIND_PACKAGE(...)`. If a CMake find script does not define the variables in this manner, an additional file `conf/<VAR_SUFFIX>.cmake` has to be created which sets the variables using the find scripts custom output variables.

Adding a some packages could look like this:

> `ADD_PACKAGE(Boost Boost REQUIRED COMPONENTS system filesystem program_options)`
> `ADD_PACKAGE(VTK VTK REQUIRED)`
> `ADD_PACKAGE(OSG osg)`

### Target Configuration

A configuration file located in `conf/foo/bar/` is applied to configure all executables in `exe/foo/bar/*` and libraries in `so/foo/bar/*`. Supported configuration files are `cxxflags`, `ldflags` and `package`. Each file is simply a list of string separated by white-space.

In contrast the files `conf/foo/bar/<NAME>.cxxflags`, `conf/foo/bar/<NAME>.ldflags` and `conf/foo/bar/<NAME>.package` are used to configure the compiling and linking of the single target `foo_bar_<NAME>`.

The `package` or `<NAME>.package` file contains a list of `<VAR_SUFFIX>` of the packages which are added to the project using `ADD_PACKAGE(...)` in `conf/package.cmake`.

An example configuration which applies to all targets of the whole project could look like this:

> $`echo "-std=c++11" > conf/cxxflags`
> $`echo "-Llib -lmylib" > conf/ldflags`
> $`echo "Boost VTK OSG" > conf/package`
