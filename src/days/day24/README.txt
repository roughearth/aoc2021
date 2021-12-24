consider z in base 26?

inp w    |

mul x 0  | x is temp
add x z  |
mod x 26 | set x to z mod 26 - the last digit of z

div z A  | (A is 1 or 26) z is same or div by 26
           either truncate z by 1 digit o don't, depending on type of line
           26 -> pop line
            1 -> push line

           z = z // 26 when pop line
               z       when push line


add x B  | (B > 9 when push line, B<=0 when pop line)
eql x w  |
eql x 0  | x is w !== (z mod 26) + B, B > w when push line, so x can only be 0 when pop line
           x is 1 when push line
                1 when pop line and  w !== (z mod 26) + B
                0 when pop line and  w === (z mod 26) + B

mul y 0  | y is temp
add y 25 |
mul y x  |
add y 1  | y is 26 when push line
                26 when pop line and  w !== (z mod 26) + B
                 1 when pop line and  w === (z mod 26) + B


mul z y  | z *= (25.x + 1) // x is 0 or 1 so this is either z *= 26 or z unchanged
           z = w !== (z mod 26) + B ? 26z : z
           z is 26z    when push line
                  z    when pop line and  w !== (z mod 26) + B
                  z/26 when pop line and  w === (z mod 26) + B

mul y 0  |
add y w  |
add y C  | (always +ve)
mul y x  | y is x.(w + C)
           y is w + C when push line
                w + C when pop line and  w !== (z mod 26) + B
                    0 when pop line and  w === (z mod 26) + B

add z y  | z += x.(w + C)
           z is 26z + w + C  when push line
                  z + w + C  when pop line and w !== (z mod 26) + B
                  z/26       when pop line and w === (z mod 26) + B


Push C
Pop B

A  | B   | C  | code
1  | 11  | 3  | inp w    | mul x 0  | add x z  | mod x 26 | div z 1  | add x 11 | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 3  | mul y x  | add z y
1  | 14  | 7  | inp w    | mul x 0  | add x z  | mod x 26 | div z 1  | add x 14 | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 7  | mul y x  | add z y
1  | 13  | 1  | inp w    | mul x 0  | add x z  | mod x 26 | div z 1  | add x 13 | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 1  | mul y x  | add z y
26 | -4  | 6  | inp w    | mul x 0  | add x z  | mod x 26 | div z 26 | add x -4 | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 6  | mul y x  | add z y
1  | 11  | 14 | inp w    | mul x 0  | add x z  | mod x 26 | div z 1  | add x 11 | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 14 | mul y x  | add z y
1  | 10  | 7  | inp w    | mul x 0  | add x z  | mod x 26 | div z 1  | add x 10 | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 7  | mul y x  | add z y
26 | -4  | 9  | inp w    | mul x 0  | add x z  | mod x 26 | div z 26 | add x -4 | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 9  | mul y x  | add z y
26 | -12 | 9  | inp w    | mul x 0  | add x z  | mod x 26 | div z 26 | add x -12| eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 9  | mul y x  | add z y
1  | 10  | 6  | inp w    | mul x 0  | add x z  | mod x 26 | div z 1  | add x 10 | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 6  | mul y x  | add z y
26 | -11 | 4  | inp w    | mul x 0  | add x z  | mod x 26 | div z 26 | add x -11| eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 4  | mul y x  | add z y
1  | 12  | 0  | inp w    | mul x 0  | add x z  | mod x 26 | div z 1  | add x 12 | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 0  | mul y x  | add z y
26 | -1  | 7  | inp w    | mul x 0  | add x z  | mod x 26 | div z 26 | add x -1 | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 7  | mul y x  | add z y
26 | 0   | 12 | inp w    | mul x 0  | add x z  | mod x 26 | div z 26 | add x 0  | eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 12 | mul y x  | add z y
26 | -11 | 1  | inp w    | mul x 0  | add x z  | mod x 26 | div z 26 | add x -11| eql x w  | eql x 0  | mul y 0  | add y 25 | mul y x  | add y 1  | mul z y  | mul y 0  | add y w  | add y 1  | mul y x  | add z y