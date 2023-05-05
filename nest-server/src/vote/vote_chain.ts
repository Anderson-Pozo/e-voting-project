import { SHA256 } from 'crypto-js';

class Block {
    public index: number;
    public timestamp: Date;
    public data: any;
    public previousHash: string;
    public hash: string;
    
    constructor(index: number, timestamp: Date, data: any, previousHash: string = '') {
      this.index = index;
      this.timestamp = timestamp;
      this.data = data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
    }
    
    calculateHash(): string {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
  }
  
  class Blockchain {
    private chain: Block[];
    
    constructor() {
      this.chain = [this.createGenesisBlock()];
    }
    
    createGenesisBlock(): Block {
      return new Block(0, new Date(), "Genesis block", "0");
    }
    
    getLatestBlock(): Block {
      return this.chain[this.chain.length - 1];
    }
    
    addBlock(newBlock: Block): void {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
    }
    
    isChainValid(): boolean {
      for (let i = 1; i < this.chain.length; i++) {
        const currentBlock = this.chain[i];
        const previousBlock = this.chain[i - 1];
        
        if (currentBlock.hash !== currentBlock.calculateHash()) {
          return false;
        }
        
        if (currentBlock.previousHash !== previousBlock.hash) {
          return false;
        }
      }
      
      return true;
    }
  }
  
  const blockchain = new Blockchain();
  blockchain.addBlock(new Block(1, new Date(), { amount: 4 }));
  blockchain.addBlock(new Block(2, new Date(), { amount: 8 }));
  console.log(blockchain.isChainValid());