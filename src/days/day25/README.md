# Mod maths

7 *is* a generator of the muliplication group order 20201227.

20201226 = 2 × 3 × 29 × 116099

So we can check 7^n != 1 for each of the following.

* (choose 1) 2, 3, 29, 116099,
* (choose 2) 6, 58, 232198, 87, 348297, 3366871,
* (choose 3) 10100613, 6733742, 696594, 174,

# Baby-step giant-step algorithm for a modulal logarithm

(From https://en.wikipedia.org/wiki/Baby-step_giant-step)

Input: A cyclic group G of order n, having a generator α and an element β.
Output: A value x satisfying α^x = β.

m ← Ceiling(√n)
For all j where 0 ≤ j < m:
  Compute αj and store the pair (j, α^j) in a table. (See § In practice)
  Compute α^−m.
γ ← β. (set γ = β)
For all i where 0 ≤ i < m:
  Check to see if γ is the second component (α^j) of any pair in the table.
  If so, return im + j.
  If not, γ ← γ * α^−m.

