import axios from 'axios';

const web3 = new Web3('https://speedy-nodes-nyc.moralis.io/ecb9b1fb67d679e74a8cf95c/eth/mainnet/archive');

export async function getABI(contract) {
  const abi_url = `https://api.etherscan.io/api?module=contract&action=getabi&address=${contract}&apikey=3YGDVJV9UB8SD9U42P34FV1W3F1Q1SG8SR`;
  const abi = await axios.get(abi_url).then((result) => {return JSON.parse(result.data.result)});
  return abi;
}

export async function getABIevents(contract) {
  const abi = await getABI(contract);
  let events = [{name: ""}];
  abi.forEach(t => {
    if (t.type === 'event') {
      events.push(t);
    }
  });
  return [abi, events];
}

export function getTopic(event) {
  let inputs = "";
  event.inputs.forEach( (i) => {
    inputs.length > 0 ? inputs = inputs + ',' : null;
    inputs = inputs + i.type;
  })
  return web3.utils.sha3(`${event.name}(${inputs})`);
}

export async function getTransaction(address, abi, event, topic) {
  const fromBlock = await web3.eth.getBlockNumber() - 9999;
  const contract = new web3.eth.Contract(abi, address);
  let options = {
    fromBlock: fromBlock,
    toBlock: 'latest',
    topics: [topic]
  };
  const ex = await contract.getPastEvents(event, options)
  return ex[0];
}