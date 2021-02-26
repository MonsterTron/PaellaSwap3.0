"use strict";
$(document).ready(function () {
    setTimeout(getData, 500);
    setTimeout(checkAccount, 1000);
});

const uniswap = [{"constant":true,"inputs":[{"name":"amountOut","type":"uint256"},{"name":"path","type":"address[]"}],"name":"getAmountsIn","outputs":[{"name":"amounts","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amountOutMin","type":"uint256"},{"name":"path","type":"address[]"},{"name":"to","type":"address"},{"name":"deadline","type":"uint256"}],"name":"swapExactETHForTokens","outputs":[{"name":"amounts","type":"uint256[]"}],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"amountIn","type":"uint256"},{"name":"path","type":"address[]"}],"name":"getAmountsOut","outputs":[{"name":"amounts","type":"uint256[]"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"amountOut","type":"uint256"},{"name":"path","type":"address[]"},{"name":"to","type":"address"},{"name":"deadline","type":"uint256"}],"name":"swapETHForExactTokens","outputs":[{"name":"amounts","type":"uint256[]"}],"payable":true,"stateMutability":"payable","type":"function"}];

const erc20 = [{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"from","type":"address"},{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"to","type":"address"},{"name":"tokens","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"spender","type":"address"},{"name":"tokens","type":"uint256"},{"name":"data","type":"bytes"}],"name":"approveAndCall","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[{"name":"tokenOwner","type":"address"},{"name":"spender","type":"address"}],"name":"allowance","outputs":[{"name":"remaining","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"anonymous":false,"inputs":[{"indexed":true,"name":"from","type":"address"},{"indexed":true,"name":"to","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"tokenOwner","type":"address"},{"indexed":true,"name":"spender","type":"address"},{"indexed":false,"name":"tokens","type":"uint256"}],"name":"Approval","type":"event"}];


const pancakeRouter = "0x05ff2b0db69458a0750badebc4f9e13add608c7f";

var pancakeRouterContract;

var provider;
var web3;
var account;
async function getData() {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
    }
    pancakeRouterContract = web3.eth.contract(uniswap).at(pancakeRouter);
    updateData();
}

function updateData() {

    var path = ["0x8893D5fA71389673C5c4b9b3cb4EE1ba71207556", "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c", "0xe9e7cea3dedca5984780bafc599bd69add087d56"];
    pancakeRouterContract.getAmountsOut("1000000000000000000", path, (err, result) => {
        const nutPrice = web3.fromWei(result[2], "ether");
        $("#currentPrice").text("$" + nutPrice.toFixed(2));
    });

    setTimeout(updateData, 2000);
}

function checkAccount() {
    if (web3 && web3.eth) {
        web3.eth.getAccounts((err, accounts) => {
            if (accounts == null || accounts.length == 0) {
                console.log("NO ACCOUNT CONNECTED");
            } else {
                if (account != accounts[0]) {
                    account = accounts[0];
                }
            }
        });
    }
    setTimeout(checkAccount, 1000);
}

async function connectAccount() {
    try {
      if (typeof window.ethereum !== 'undefined') {
          window.ethereum.enable();
          web3 = new Web3(window.ethereum);
      }
      pancakeRouterContract = web3.eth.contract(uniswap).at(pancakeRouter);
      updateData();
    } catch(e) {
      console.log("Could not get a wallet connection", e);
      return;
    }
}
