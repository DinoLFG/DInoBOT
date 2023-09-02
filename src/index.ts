import express from "express";
import bodyParser from "body-parser";
import TelegramBot from "node-telegram-bot-api";
const Moralis = require("moralis").default;
const { EvmChain } = require("@moralisweb3/common-evm-utils");
require('dotenv').config()

import { Network, Alchemy, Nft, AssetTransfersCategory } from "alchemy-sdk";
import { rmSync } from "fs";

const settings = {
  apiKey: 'tPu542ovYs2bBB3xXQqHdGKILS9oCsdt',
  network: Network.ETH_MAINNET,
};
const runApp = async () => {
  await Moralis.start({
    apiKey: process.env.MORALIS_KEY,
  });
}
const alchemy = new Alchemy(settings);


const web3 = require('web3');


async function main(): Promise<void> {
  runApp()
  const app = express();

  const port = process.env.PORT || 3000;
  // Parse the request body as JSON
  app.use(bodyParser.json());
  // Create a TelegramBot instance with your bot token
  const botToken = String(process.env.BOT);
  const bot = new TelegramBot(botToken, { polling: true });
  let chatId: string | undefined; // Define chatId as undefined initially
  app.listen(port, "0.0.0.0", function () {
    console.log(`Example Alchemy Notify app listening at ${port}`);
  });
  // Listen for the "start" command
  bot.onText(/\/startDinoBot/, (msg) => {
    chatId = msg.chat.id;
    bot.sendMessage(chatId, "Hello! Your notification bot has been set up now!");
  });
  //TYPES
  const typesArray = [
    {type: 'address', name: 'buyer'}, 
    {type: 'uint256', name: 'quantity'},
];
  app.get("/",async (req,res)=>{
        res.sendStatus(200);
  })
  // Register handler for Alchemy Notify webhook events
  app.post("/eggVerter", async (req, res) => {
    const webhookEvent = req.body;
    const logs = webhookEvent.event.data.block.logs;
    if (logs.length === 0) {
    } else {
      for (let i = 0; i < logs.length; i++) {
        console.log("Verter",Date.now())
        let receipt = await alchemy.core.getTransactionReceipt(logs[i].transaction.hash)
        let filteredRecepit = receipt?.logs.filter(x=>x.topics[3]) ?? []
        let filteredRecepitLength = filteredRecepit?.length ?? 0;
        let eggText=""
        if(filteredRecepitLength>0){
          if(filteredRecepitLength<4){
            for(let i =0;i<filteredRecepitLength;i++){
              eggText+=`🦖Dino Mystery Egg \\#${parseInt(filteredRecepit[i].topics[3],16)}🥚\n`
            }
          }else{
            for(let i =0;i<4;i++){
              eggText+=`🦖Dino Mystery Egg \\#${parseInt(filteredRecepit[i].topics[3],16)}🥚\n`
            }
            eggText+=`...[${filteredRecepitLength-4}]`
          }
        const decodedParameters = web3.eth.abi.decodeParameters(typesArray, logs[i].data); 
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
          "chain": EvmChain.ETHEREUM,
          "address": String(process.env.JACKPOT_CONTRACT)
        });
        let tokenResponse = response.jsonResponse
        let tokenJackpotPoolResponse: { balance: any; }[] = []
        if(tokenResponse.length>1){
           tokenJackpotPoolResponse = tokenResponse.filter((x: { token_address: any; })=>x.token_address == String(process.env.DINO_CONTRACT))
        }
        else{
          tokenJackpotPoolResponse = tokenResponse
        }
        let balance =  Number(tokenJackpotPoolResponse[0].balance)
        let buyerData = `https://etherscan\\.io/tx/${logs[i].transaction.hash}`
        let balanceReformated = `${(balance/Math.pow(10,18)).toLocaleString("en-US")}`
          bot.sendVideo(-1001883928989,"src/IMG_7560.MP4",{
            caption: `🔄🦖🥚🔄🦖🥚🔄🦖🥚🔄🦖🥚\n\n*Swapped* ${Number(decodedParameters.quantity)*1000} $DINO🔄🦖🥚
            \n${eggText}\n🏆Total $DINO Jackpot🏆\n            ${balanceReformated} $DINO\n\n[TX](${buyerData})\\|[Buyer](https://etherscan\\.\\io/address/${decodedParameters.buyer})`,
            parse_mode: 'MarkdownV2'
          })
      }
    }
    }
    res.sendStatus(200);
  });



  let mysteryegg1 = [372 , 6187 , 7609 , 8992 , 272 , 6692 , 7496 , 4834 , 2041 , 2397 , 4180 , 4131 , 9316
    , 4597 , 1286 , 3555 , 4708 , 5743 , 9201 , 2620 , 5084 , 1196 , 1909 
    , 7733 , 1537 , 2102 , 5727 , 4523 , 8719 , 8532 , 8233 , 1550 , 3522 
    , 2238 , 6063 , 1847 , 8540 , 8326 , 6204 , 7507 , 7448 , 2555 , 6033 
    , 4660 , 2819 , 9345 , 3674 , 7755 , 2888 , 8814 , 6069 , 6589 , 5017 
    , 7311 , 770 , 3005 , 6206 , 3193 , 9948 , 244 , 104 , 3787 , 2527 , 4568 
    , 571 , 4105 , 5159 , 8466 , 2412 , 7549 , 9940 , 2117 , 3644 , 7328 , 6219
     , 264 , 6841 , 8246 , 522 , 4315 , 7591 , 4833 , 3991 , 5943 , 9895 , 7320 , 4681 
     , 7058 , 781 , 6149 , 7978 , 1036 , 4357 , 7552 , 8307 , 2811 , 9135 , 1938 , 9740 , 8519]
  
  let hoodie = [6164 , 3319 , 6433 , 5669 , 2268 , 7862 , 14 , 2466 , 5294 , 3436 , 6246 , 3147 , 2573 
    , 6578 , 7540 , 4371 , 1580 , 113 , 2899 , 3779 , 2647 , 8357 , 6508 , 2472 , 802 , 1929 , 7217 , 591 , 9920 , 7425]
  
  let nft = [1280 , 295 , 6423 , 5586 , 9581 , 7162 , 1175 , 5692 , 3151 , 6792 , 2597 
    , 1588 , 4319 , 9661 , 6759 , 7977 , 5417 , 2782 , 3896 , 171]
  
  let k50 = [3712 , 7410 , 335 , 138 , 1018 , 8697 , 6013 , 5361 , 4534 , 1061]
  
  let ps5 = [6132 , 8226 , 3011]
  
  let iphone =[6467 , 2935]
  
  let doge =[528]
  
  let k500 = [3152]

  let jackPot = [1501,9915,1930,3933,5832,7924,2803,8301,6473,2512]


  app.post("/eggHatch", async (req, res) => {
    const webhookEvent = req.body;
    const logs = webhookEvent.event.data.block.logs;
    if (logs.length === 0) {
    } else {
      for (let i = 0; i < logs.length; i++) {
        console.log("Hatch",Date.now())
        let receipt = await alchemy.core.getTransactionReceipt(logs[i].transaction.hash)
        let filteredRecepit = receipt?.logs.filter(x=>x.topics[3]) ?? []
        let dinoEgg = `${parseInt(filteredRecepit[0].topics[3],16)}`
        let dinoPFP = `${parseInt(filteredRecepit[1].topics[3],16)}`
        let dinoPFPNumber = Number(parseInt(filteredRecepit[1].topics[3],16))
        let dinoClass = "";
      
        switch (true) {
          case dinoPFPNumber > 1 && dinoPFPNumber < 2000:
            dinoClass+="Archer"
            break;
          case dinoPFPNumber >= 2001 && dinoPFPNumber < 4000:
            dinoClass+="Pirate"
            break;
          case dinoPFPNumber >= 4001 && dinoPFPNumber < 6000:
            dinoClass+="Thief"
            break;
          case dinoPFPNumber >= 6001 && dinoPFPNumber < 8000:
            dinoClass+="Warrior"
            break;
          case dinoPFPNumber >= 8001 && dinoPFPNumber <= 10000:
            dinoClass+="Wizzard"
            break;
          default:
            return "Invalid range: dinoPFP is not within any of the specified cases";
        }
        let rewardText = ""
        const response = await Moralis.EvmApi.token.getWalletTokenBalances({
          "chain": EvmChain.ETHEREUM,
          "address": String(process.env.JACKPOT_CONTRACT)
        });
        let tokenResponse = response.jsonResponse
        let tokenJackpotPoolResponse: { balance: any; }[] = []
        if(tokenResponse.length>1){
           tokenJackpotPoolResponse = tokenResponse.filter((x: { token_address: any; })=>x.token_address == String(process.env.DINO_CONTRACT))
        }
        else{
          tokenJackpotPoolResponse = tokenResponse
        }
        let balance =  Number(tokenJackpotPoolResponse[0].balance)
        let balanceReformated = `${(balance/Math.pow(10,18)).toLocaleString("en-US")}`
        let reward = 0;
        if(mysteryegg1.includes(Number(dinoPFPNumber))){
          reward =1
          rewardText+= "*1x Dino Mystery Egg*"
        }
        else if(hoodie.includes(Number(dinoPFPNumber))){
          reward =1
          rewardText+= "*1x DinoLFG Hoodie*"
        }
        else if(nft.includes(Number(dinoPFPNumber))){
          reward =1
          rewardText+= "*1x DINOsaur NFT*"
        }
        else if(k50.includes(Number(dinoPFPNumber))){
          reward =1
          rewardText+= "*50,000 $DINO \\+ 10 Dino Mystery Eggs \\+ 1x DinoLFG Hoodie*"
        }
        else if(ps5.includes(Number(dinoPFPNumber))){
          reward =1
          rewardText+= "*1x PS5 or 1x Nintendo Switch*"
        }
        else if(iphone.includes(Number(dinoPFPNumber))){
          reward =1
          rewardText+= "*1x iPhone 14*"
        }
        else if(doge.includes(Number(dinoPFPNumber))){
          reward =1
          rewardText+= "*1x Signed Dogecoin by Dogecoin creator Billy Markus*"
        }
        else if(k500.includes(Number(dinoPFPNumber))){
          reward =1
          rewardText+= "*500,000 $DINO \\+ 100 Dino Mystery Eggs \\+ 1x DinoLFG Hoodie*"
        }
        else if(jackPot.includes(Number(dinoPFPNumber))){
          reward =1
          rewardText+= `💸💸💸💸💸💸💸💸💸💸💸💸💸\n                *You won ${balanceReformated} $DINO*\n💸💸💸💸💸💸💸💸💸💸💸💸💸`
        }
        else{
          reward = 0
          rewardText+= ""
        }
        const decodedParameters = web3.eth.abi.decodeParameters(typesArray, logs[i].data); 
        let buyerData = `https://etherscan\\.io/tx/${logs[i].transaction.hash}`
        console.log(reward)
        console.log(reward==1)
        if(reward==1){
          bot.sendPhoto(-1001883928989,`https://dinolfg.s3.us-east-2.amazonaws.com/resizedPFP/${dinoPFP}.webp`,{
            caption: `🔄🦖🥚🔄🦖🥚🔄🦖🥚🔄🦖🥚\n\n*Dino Mystery Egg ID:* \\#${dinoEgg}\n*DINOsaur ID:* \\#${dinoPFP}\n*DINOsaur Class:* ${dinoClass}\n\n🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆\n${rewardText}\n🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆🏆
            \n[TX](${buyerData})\\|[Minter](https://etherscan\\.\\io/address/${decodedParameters.buyer})`,
            parse_mode: 'MarkdownV2'

          }) 
        }
        else{
              bot.sendPhoto(-1001883928989,`https://dinolfg.s3.us-east-2.amazonaws.com/resizedPFP/${dinoPFP}.webp`,{
            caption: `🔄🦖🥚🔄🦖🥚🔄🦖🥚🔄🦖🥚\n\n*Dino Mystery Egg ID:* \\#${dinoEgg}\n*DINOsaur ID:* \\#${dinoPFP}\n*DINOsaur Class:* ${dinoClass}${rewardText}\n
            \n[TX](${buyerData})\\|[Minter](https://etherscan\\.\\io/address/${decodedParameters.buyer})`,
            parse_mode: 'MarkdownV2'
          }) 
        }
    }
    }
    res.sendStatus(200);
  });

  // Listen to Alchemy Notify webhook events
}
main();
