const prompt = require('prompt-sync')({sigint: true});

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';
let step = 0;

const field1 = [];
// const field1 = [
//     ['*', '░', 'O'], //y=0, x=0,1,2
//     ['░', 'O', '░'], //y=1, x=0,1,2
//     ['░', '░', '░'], //y=2, x=0,1,2
//     ['O', '░', 'O'],
//     ['░', '░', '░'],
//     ['O', '░', '^'],
//     ['░', 'O', '░']
//   ];

class Field {
    constructor(fieldArray) {
      this.field = fieldArray;
      this.y = 0; //直行
      this.x = 0; //横行
      this.statuGame = true;
      // this.height;
      // this.width;
      // this.percentage;
    }
    
    runGame() {
      // let statuGame = true;
      while (this.statuGame === true) {
        this.print();
        this.question();
        this.playRole();
      }
    }
    
    print() {
      for(let i = 0; i < this.field.length; i++){
        console.log(this.field[i].join(''));
      }
    }
    
    question() {
      const q1 = prompt('Plase enter your way(u, d, l, r)?');
      switch (q1) {
        case "u": 
          this.y -= 1; //or y--; or long code: (this.y = this.y -1;)
          break;
        case "d":
          this.y += 1;
          break;
        case "l":
          this.x -= 1;
          break;
        case "r":
          this.x += 1;
          break;
        default:
          console.log ("Your enter is wrong! Place try again!");
          this.question();
          break;
        }
        step++;
        console.log(`Current step is ${step}!`);
      }
      
      playRole() {
        //start game - gaming status: started or not? true/false
        // let statuGame = true;
        // while (statuGame === true) {
          //check location - what is the user input? what would be changed? 
          //what is the index of this.field now?
          // console.log(`this.field[${this.y}][${this.x}]`);
          //check if the game is over
          //if input is out of the map
          if (this.y < 0 || this.x < 0 || this.y >= this.field.length || this.x >= this.field[this.y].length) {
            this.statuGame = false;
            console.log ("Your are lose!")
            //else if input is hat
          } else if (this.field[this.y][this.x] === hat) {
            this.statuGame = false;
            console.log (`Your are win in ${step} steps!`)
            //else input is hole
          } else if (this.field[this.y][this.x] === hole) {
            this.statuGame = false;
            console.log ("Your are lose!")
          } else {
            //update map
            this.field[this.y][this.x] = pathCharacter;
          }
        }
        
        /* 
        Add a .generateField() method to your Field class. This doesn’t need to be tied to a particular instance, so make it a static method of the class itself.
        
        This method should at least take arguments for height and width of the field, and it should return a randomized two-dimensional array representing the field with a hat and one or more holes. In our solution, we added a third percentage argument used to determine what percent of the field should be covered in holes. 
        */
       
       
       //name of the method {static generateField(input)}
       //input: user height width percentage 
       //條件1: 隨機 ░ O 
       //條件2: *(0,0)
       //output: print map
       
       static generateField(height, width, percentage) {
         let testArr = [hole, fieldCharacter];
         let bigArray = [];
         // let findHat = hat;
         while (bigArray.length < height) {
           //  for (let i = 0; i < height; i += 1) {
             let smallArray = [];
             for (let j = 0; j < width; j += 1) {
               let a = Math.floor(Math.random() * testArr.length);
               //  console.log(height * width);
               //if the map length 60/100 = 0.6
               smallArray.push(testArr[a]);
               //  console.log(sumFieldCharacter);
              }
              let sumFieldCharacter = smallArray.filter(ele => ele === fieldCharacter);
              if (sumFieldCharacter.length / width >= percentage) {
                bigArray.push(smallArray);
              }
              // bigArray[5][3<< random 012] = hat;
              // console.log(bigArray);
              // console.log(testArr.length);
              // console.log(this.bigArray[0][0]);
            }
            bigArray[0][0] = pathCharacter;
            bigArray[height - 1][Math.floor(Math.random() * width)] = hat;
            return bigArray;
          }
        }
  const myField = new Field(Field.generateField(15, 20, 0.7));
    // myField.runGame();
    // console.log(myField)
    myField.runGame();
    


