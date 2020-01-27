const option1 = {
    0: '',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine'
}

const option2 = {
    0: '',
    1: 'eleven',
    2: 'twelve',
    3: 'thirteen',
    4: 'fourteen',
    5: 'fifteen',
    6: 'sixteen',
    7: 'seventeen',
    8: 'eighteen',
    9: 'nineteen'
}

const option3 = {
    0: '',
    1: 'ten',
    2: 'twenty',
    3: 'thirty',
    4: 'forty',
    5: 'fifty',
    6: 'sixty',
    7: 'seventy',
    8: 'eighty',
    9: 'ninety'
}

const param = {
    1: 'hundred',
    2: 'thousands',
    3: 'million',
    4: 'billion'
}

const printArr = (arr) => {
    let res = ''
    for (let index = arr.length - 1; index >= 0; index--) {
        const element = arr[index];
        res += element.word + ' '
    }
    return res;
    
}

const addSeparator = (array, separator) => {
    let result = []
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        result.push(element)
        if (element.num && index != 0 && index != array.length -1) {
            result.push({
                word: separator
            })
            
        }
    }
    return result
}

const addParam = (array, numbers) => {
    let result = []
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        result.push(element)
        if (param[index] != undefined && index != numbers.length - 1) {
            result.push({
                word: param[index]
            })
        }
        
    }
    return result
    
}

const addFinalParam = (array) => {
    let result = []
    let start = 2
    for (let index = 0; index < array.length; index++) {
        const element = array[index];
        result.push(element)
        if (param[start] != undefined && index != array.length - 1) {
            result.push(param[start] + ' and')
        }
        start += 1
    }
    
    return result.reverse().join(' ');
    
}

const say = (number) => {
    let numbers = []
    let par = []
    let start
    
    if (number.length == 1) {
        start = 0
    } else {
        start = number.length - 1
    }
    
    for (let index = start; index >= 0; index--) {
        const num = number[index];
        numbers.push({
            num,
            word: option1[num]
        });
        
    }
    
    for (let index = 0; index < numbers.length; index++) {
        const { num, word } = numbers[index];
        
        // belasan
        if (index == 1 && num == 1) {
            const numberBefore = numbers[index - 1].num;
            
            par[index - 1].word = ''
            par.push({
                num: num,
                word: option2[numberBefore]
            })
        }
        // puluhan 
        else if (index == 1 && num != 1) {
            par.push({
                num,
                word: option3[num]
            })
        } else {
            par.push({
                num,
                word: option1[num]
            })

        }
        
    }

    const resultWithParam = addParam(par, numbers)
    const resultWithSeparator = addSeparator(resultWithParam, 'and')
    return printArr(resultWithSeparator);
    
}

const reverse = (s) => {
    return s.split("").reverse().join("");
}

export default function calcu(input) {
    let resultArr = []
    let resultDollarsArr = []
    let inputSplit = input.toString().split('.')
    let inputDollars
    if (inputSplit.length > 1) {
        inputDollars = inputSplit[0]
    } else {
        inputDollars = inputSplit.toString()
        
    }
    
    let inputDollarsArr = reverse(inputDollars).match(/.{1,3}/g)
    for (let index = 0; index < inputDollarsArr.length; index++) {
        const element = inputDollarsArr[index];
        let result = say(reverse(element))
        if (result && result != ' ') {
            resultDollarsArr.push(result);
        } 
        
    }
    
    let result;
    if (inputDollarsArr.length > 1) {
        result = addFinalParam(resultDollarsArr)
    } else {
        result = resultDollarsArr.toString();
        
    }
    result += ' dollars'
    resultArr.push(result);
    
    if (inputSplit[1]) {
        let resultCents = say(inputSplit[1])
        if (resultCents && resultCents != ' ') {
            resultCents += ' cents'
            resultArr.push(resultCents);
        }
        
    }
    
    let finalResult = resultArr.join(' and ').replace(/ +(?= )/g,'');
    return finalResult;

}

// export default function hello() {
//     return console.log("Hello");
//     ;
// }
