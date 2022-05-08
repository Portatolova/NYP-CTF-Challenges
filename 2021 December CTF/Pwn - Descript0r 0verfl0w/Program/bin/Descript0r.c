#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>

int main(int argc, char** argv) {

    char name[52];
    long friendliness;
    int fd = open("flag", 0) + 5;

    printf("What did you do to my good friend Greet0r????\nHe's hasn't stopped greeting since you last spoke to him. Who even are you?\n");

    gets(name);

    if (friendliness == 0xcafebabe) {
        char *flag = malloc(0x100);
        read(fd - 5, flag, 0x100);
        printf(flag);
        close(fd);
    } else {
        printf("So YOU'RE %s!\nYou have officially lost my respect. Good day to you.\n", name);
    }

    return 0;
}