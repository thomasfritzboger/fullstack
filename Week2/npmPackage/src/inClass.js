const superagent = require('superagent');
const fs = require('fs');

// CALLBACK -HELL
//console.log(__dirname)

// fs.readFile(`${__dirname}/dog.txt`,"utf-8",(err,data) => {
//     superagent
//         .get(`https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`)
//         .end((err, res) => {
//             if (err) return console.log(err);
//             fs.writeFile('dog.img.txt',res.body.message, err => {
//                 if (err) return console.log(err);
//                 console.log("Dog image saved to file successfully")
//             console.log(res.body.message)
//         })
//     })
// })

// THEN SYNTAX
// fs.readFile(`${__dirname}/dog.txt`,"utf-8",(err,data) => {
//     superagent
//         .get(`https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`)
//         .then(res => {
//             console.log(res.body.message)
//             fs.writeFile('dog.img.txt',res.body.message, err => {
//                 console.log("Dog image saved to file successfully")
//         });
//     })
//         .catch(err => console.log(err.message))
// });

// PROMISE

const readFilePro = (file) => {
    // executor function
    return new Promise((resolve,reject) => {
        fs.readFile(file,"utf-8",(err,data ) => {
            if (err) reject("File not found");
            resolve(data);
        })
    })
}

const writeFilePro = (data) => {
    // executor function
    return new Promise((resolve,reject) => {
        fs.writeFile("dog.img.txt",data, err => {
            if (err) reject("File not found");
            resolve("Dog image saved to file");
        })
    })
}

// readFilePro(`${__dirname}/dog.txt`)
//  .then(data => superagent.get(`https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`)
//      .then(res => writeFilePro(res.body.message))
//      .then((res => console.log(res)))
//      .catch(err => console.log(err))
//      .finally(() => console.log("I am done"))
//  )

// ASYNC/AWAIT

// const getDogPicture = async () => {
//     try {
//         const data = await readFilePro(`${__dirname}/dog.txt`)
//         const res = await superagent
//             .get(`https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`)
//         const text = await writeFilePro(res.body.message);
//         return text;
//     } catch (e) {
//         throw new Error(e.message)
//         console.log(e)
//     }
// }

// getDogPicture()
//     .then(res => console.log(res))

// IIFE IMMEDIATLY INVOKED FUNCTION EXPRESSION
// (async () => {
//     try {
//         const data = await getDogPicture();
//         console.log(data)
//     } catch (e) {
//         console.log(e)
//     }
//
// })()

// WAITING FOR MULTIPLE PROMISES

const getDogPicture = async () => {
    try {
        const data = await readFilePro(`${__dirname}/dog.txt`)
        const res1 = await superagent
            .get(`https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`)

        const res2 = await superagent
            .get(`https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`)

        const res3 = await superagent
            .get(`https://dog.ceo/api/breed/${data.trim().toLowerCase()}/images/random`)

        const all = await Promise.all([res1,res2,res3])
        const images = (all).map(el => el.body.message);
        console.log(images)

        const text = await writeFilePro(images.join('\n'));
        //return text;
    } catch (e) {
        throw new Error(e.message)
        console.log(e)
    }
}

getDogPicture()

