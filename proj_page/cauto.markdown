
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

The project configuration is located in `conf/`. The configuration is based on files. The most important files are:

> `conf/project` - name of project
> `conf/package.cmake` - external dependencies of project, use CMake find scripts
> `conf/*/cxxflags` - additional compiler flags
> `conf/*/ldflags` - additional linker flags
> `conf/*/package` - packages to be used by targets

`conf/project` simply contains the name of the project and is passed to the CMake command `PROJECT(...)`. You can set it up by:

> $`echo "MyProjectName" > conf/project`

`conf/package.cmake` contains CMake commands to setup external dependencies using CMake find scripts. To do so the command

> `ADD_PACKAGE(<VARSUFFIX> <FIND_PACKAGE_ARGS...>)`

has to be used. `ADD_PACKAGE(...)` wraps the CMake command `FIND_PACKAGE(...)` and requires the find script to setup the following CMake variables:


