# Perseverance

Perseverance is a mars robot simulator that takes in a string of commands representing:
- the outer bounds of the world (x,y coordinates)
- the starting position of the robot (x,y coordinates)
- a set of directional commands for the robot to represent turns and forward movement (left/L, right/R, forward/F)

Using the above instruction set, Perseverance will output it's final position in the form of x,y coordinates and a bearing (N, E, S, W).

#### Example Input + Output

Note: a real input should contain no comments and each instruction set should be separated by an empty new line.
```bash
# sample input.txt
5 5 # x,y world bounds: 0,0 to 5,5
1 1 E # x,y starting position: 1,1 facing east
RRF # directional commands: turn right two, then move forward one position

# another set of commands for the robot
2 2 N
LRFLRFLRFLRF
```

Expected output:
```bash
0 1 W # turned right twice, moved forward one position
2 5 N LOST # moved forward 4 positions, fell off the world
```


## Prerequisites

- Node JS >=20.10.0

## Installation + Running

1. Clone the repository
2. Run `npm install`
3. Fill in a set of instructions inside the `input.txt` file
4. Run `npm start` to execute the simulation

## Testing

1. Ensure all dependencies are installed (`npm install`)
2. Run `npm test` to run the test suite

## Development

- This project uses Prettier; configure your editor to auto-format code using the default Prettier settings (found in node_modules/.bin/prettier)
- Ensure all tests are passing before merging your work
- We are using `tsx` which can be thought of as an alias for `node`, main difference being it allows us to run typescript files out-of-the-box
