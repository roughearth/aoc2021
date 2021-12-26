# Thoughts

Coordinates

[1, A, 1] is [hall, room, pos]

hall {1, 2, 4, 6, 8, 10, 11} from left
room {A, B, C, D} equiv to {3, 5, 7, 9}
pos {1, 2}



No, impossible combos

[room, pos]
room {H, A, B, C, D}
pos {1, 2, 4, 6, 8, 10, 11} if room is H
pos {1, 2} otherwise

(x, y) (0, pos) if room is H
       (pos, 3) if room is A
       (pos, 5) if room is B
       (pos, 7) if room is C
       (pos, 9) if room is D

Move cost is consumption * manhattan distance

H,1 -> (0,1)
H,2 -> (0,2)
H,4 -> (0,4)
H,6 -> (0,6)
H,8 -> (0,8)
H,10 -> (0,10)
H,11 -> (0,11)
A,1 -> (3,1)
A,2 -> (3,2)
B,1 -> (5,1)
B,2 -> (5,2)
C,1 -> (7,1)
C,2 -> (7,2)
D,1 -> (9,1)
D,2 -> (9,2)

If a pod is at top of wrong room
If a pod is at bottom of wrong room and not blocked
  it can move to hall, without passing another

If a pod is in the hall, and its target room is empty, and there isn't pod in the way
  it can move to the bottom of target room

If a pod is in the hall, and its target room has one other correct pod in it, and there isn't pod in the way
  it can move to the top target room

Otherwise
  it can't move


How about states?

OOOOHHHH

11 positions
max 1 pod at {1, 2, 4, 6, 8, 10, 11}
max 2 pods at {3, 5, 7, 9}

can move pod from {3, 5, 7, 9} to {1, 2, 4, 6, 8, 10, 11} without passing if...
can move pod from {1, 2, 4, 6, 8, 10, 11} to {3, 5, 7, 9} without passing if...

Worked example needs intermediate states

#############
#...........#
###B#C#B#D###
  #A#D#C#A#
  #########
,,BA,,CD,,BC,,DA,,

One Bronze amphipod moves into the hallway, taking 4 steps and using 40 energy:

#############
#...B.......#
###B#C#.#D###
  #A#D#C#A#
  #########
,,BA,B,CD,,C,,DA,,

The only Copper amphipod not in its side room moves there, taking 4 steps and using 400 energy:

#############
#...B.......#
###B#.#C#D###
  #A#D#C#A#
  #########
,,BA,B,D,C,C,,DA,,
,,BA,B,D,,CC,,DA,,

A Desert amphipod moves out of the way, taking 3 steps and using 3000 energy, and then the Bronze amphipod takes its place, taking 3 steps and using 30 energy:

#############
#.....D.....#
###B#.#C#D###
  #A#B#C#A#
  #########
,,BA,B,,D,CC,,DA,,
,,BA,,B,D,CC,,DA,,

The leftmost Bronze amphipod moves to its room using 40 energy:

#############
#.....D.....#
###.#B#C#D###
  #A#B#C#A#
  #########
,,A,B,B,D,CC,,DA,,
,,A,,BB,D,CC,,DA,,

Both amphipods in the rightmost room move into the hallway, using 2003 energy in total:

#############
#.....D.D.A.#
###.#B#C#.###
  #A#B#C#.#
  #########
,,A,,BB,D,CC,D,A,,
,,A,,BB,D,CC,D,,A,

Both Desert amphipods move into the rightmost room using 7000 energy:

#############
#.........A.#
###.#B#C#D###
  #A#B#C#D#
  #########
,,A,,BB,D,CC,,D,A,
,,A,,BB,,CC,,DD,A,

Finally, the last Amber amphipod moves into its room, using 8 energy:

#############
#...........#
###A#B#C#D###
  #A#B#C#D#
  #########
,,AA,,BB,,CC,,DD,,
