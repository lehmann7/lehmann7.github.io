
## Introduction

CAuto is a simple command line tool for _automatic compile and link
C++ projects_. 

CAuto aims at speeding up the workflow when managing targets and
source code in a C++ project. Thus, CAuto uses an easy naming
convention to automatically setup executables and libraries by
scanning your source tree. Just drop in your files, configure
dependencies and build. 

Using CAuto doesnt keep you off the important work - implementing
your project. Create new targets for executables and libraries is
as easy as creating a new file and run CAuto.

CAuto relies on _bash_, _CMake_ and _g++_. 

- _bash_  is used to run CAuto.
- _CMake_ manages dependencies (scans headers and uses _FindPackage.cmake_ scripts)
- _g++_   is used to scan source files and 

CAuto is in development. Many things need to be extended and moved to config
files. However it already can be used to setup C++ executables and libraries
with only a few commands on the command line.


