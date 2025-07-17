#include <stdio.h>
#include "adder.h"

#define FIRST_NUMBER 5
#define SECOND_NUMBER 3

int main() {
    int num1 = FIRST_NUMBER;
    int num2 = SECOND_NUMBER;
    int result = add(num1, num2);
    printf("%d + %d = %d\n", num1, num2, result);
    return 0;
}
