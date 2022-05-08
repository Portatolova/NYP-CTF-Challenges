
all: virus virus2

virus: virus1.s
	as -o virus.o virus.s
	ld -o virus virus.o -lSystem -syslibroot `xcrun -sdk macosx --show-sdk-path` -e _start -arch arm64 

virus2: virus2.s
	as -o virus2.o virus2.s
	ld -o virus2 virus2.o -lSystem -syslibroot `xcrun -sdk macosx --show-sdk-path` -e _start -arch arm64 