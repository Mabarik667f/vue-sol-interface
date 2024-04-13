// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";


contract Token is ERC20 {
    address public owner;
    uint initBalance;

    function decimals() pure public override returns(uint8) {
        return 12;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner!");
        _;
    }

    constructor() ERC20("CryptoMonster", "CMON") {
        initBalance = 10000000;
        owner = msg.sender;
        _mint(owner, initBalance);
        
    }

    function tokensApprove(address account, address spender, uint amount) public {
        _approve(account, spender, amount);
    }

}

contract System {
    address public owner;
    address public publicProvider;
    address public privateProvider;

    address public investor1 = 0xE50195B91e03C6AF1ba0969024Ed28271733a701;
    address public investor2 = 0xa269edcE7d2E37c2b0a1A53DEdd1D97D90F8A05b;
    address public bestFriend = 0xD815158bE38d88D052d979D94b95f7F29E39fb2D;
    
    Token public token;

    uint public TimeStart;
    uint public TimeNow;
    uint public TimeSystem;
    uint public TimeDiff;

    uint public privateTokens = 3000000;
    uint public publicTokens = 6000000;

    uint public privateTokenPrice = 0.00075 ether;
    uint public publicTokenPrice = 0.001 ether;

    uint public systemStage;
    uint public systemLifeMinutes;


    struct Investor {
        string name;
        address account;
    }

    struct User {
        address account;
        uint seedTokens;
        string role;

    }

    mapping(address => uint) private privateTokensOnUser;
    mapping(address => uint) private publicTokensOnUser;
    mapping(address => User) private users;
    mapping(address => Investor) public whiteList;
    mapping(address => Investor) public investorsRequests;


    address[] public requestAdresses;

    
    constructor() {
        owner = msg.sender;
        users[owner] = User(owner, 0, "admin");
        token = new Token();
        
        users[owner] = User(owner, 0, "admin");
        privateProvider = 0x2607C7108DB45C580BE44A5288bE4Ff06B9B0a92;
        users[0x2607C7108DB45C580BE44A5288bE4Ff06B9B0a92] = User(0x2607C7108DB45C580BE44A5288bE4Ff06B9B0a92, 0, "privateProvider");
        publicProvider = 0xa7e61BF7592E1495c6a1334E918a662FbbeecB80;
        users[0xa7e61BF7592E1495c6a1334E918a662FbbeecB80] = User(0xa7e61BF7592E1495c6a1334E918a662FbbeecB80, 0, "publicProvider");

        token.transfer(investor1, 300000);
        users[0xE50195B91e03C6AF1ba0969024Ed28271733a701] = User(0xE50195B91e03C6AF1ba0969024Ed28271733a701, 300000, "user");
        token.transfer(investor2, 400000);
        users[0xa269edcE7d2E37c2b0a1A53DEdd1D97D90F8A05b] = User(0xa269edcE7d2E37c2b0a1A53DEdd1D97D90F8A05b, 400000, "user");
        token.transfer(bestFriend, 200000);
        users[0xD815158bE38d88D052d979D94b95f7F29E39fb2D] = User(0xD815158bE38d88D052d979D94b95f7F29E39fb2D, 200000, "user");
        TimeNow = TimeStart = TimeSystem = block.timestamp;
        systemStage = 1;

        token.tokensApprove(address(this), owner, 10000000);
        
        
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "not an owner!");
        _;
    }

    modifier isPublicProvider() {
        require(msg.sender == publicProvider, "not an publicProvider!");
        _;
    }

    modifier isPrivateProvider() {
        require(msg.sender == privateProvider, "not an privateProvider!");
        _;
    }

    modifier isInvestor() {
        require(whiteList[msg.sender].account != address(0), "Free sale not started");
        _;
    }
    
    modifier isSeedStage() {
        require(systemStage == 0, "not seed stage!");
        _;
    }

    modifier isPrivateStage() {
        require(systemStage == 1, "not private stage!");
        _;
    }

    modifier isPublicStage() {
        require(systemStage == 2, "not public stage!");
        _;
    }

    modifier isRegister() {
        if(users[msg.sender].account == address(0)) {
            users[msg.sender] = User(msg.sender, 0, "user");
        }
        _;
    }

    modifier setTime() {
        changeTime();
        _;
    }

    function changeTime() internal {

        TimeNow = block.timestamp;
        TimeSystem = TimeNow + TimeDiff;
        systemLifeMinutes = (TimeSystem - TimeStart) / 60;
        if(systemLifeMinutes < 5) {
            systemStage = 0;
        } else if (systemLifeMinutes < 15) {
            systemStage = 1;
        } else {
            systemStage = 2;
        }
    }

    function addOneMinute() public {
        TimeDiff += 60;
        changeTime();
    }

    function getBalance() public view returns(uint){
        return token.balanceOf(msg.sender);
    }

    function getAllUserData(address account) public view onlyOwner returns(User memory) {
        return users[account];
    }

    function getYourSelfData() public view returns(User memory){
        return users[msg.sender];
    }

    function getPrivateTokensBalanceOnUser(address account) public view isPrivateProvider returns(uint){
        return privateTokensOnUser[account];
    }

    function getPublicTokensBalanceOnUser(address account) public view isPublicProvider returns(uint){
        return publicTokensOnUser[account];
    }

    function acceptInvestorRequest(address account) public setTime isSeedStage isPrivateProvider{
        whiteList[account] = investorsRequests[account];
        cancelInvestorRequest(account);
    }

    function cancelInvestorRequest(address account) public setTime isSeedStage isPrivateProvider {
        delete investorsRequests[account];
    }

    function inverstorRequest(string memory name) public setTime isSeedStage isRegister {
        require(investorsRequests[msg.sender].account == address(0), unicode"Ваш запрос в обработке");
        requestAdresses.push(msg.sender);
        investorsRequests[msg.sender] = Investor(name, msg.sender);

    }


    function changePublicTokenPrice(uint _newPrice) public setTime isPublicProvider{
        publicTokenPrice = _newPrice;
    }


    function buyPublicTokens(uint amount) public payable setTime isPublicStage isRegister{
        require(amount <= publicTokens, "not enought tokens!");
        require(amount <= 5000, "Limit 5000");
        require(amount * publicTokenPrice <= msg.value, "not enough wei!");
        token.transfer(msg.sender, amount);
        publicTokens -= amount;
        publicTokensOnUser[msg.sender] += amount;
    }

    function buyPrivateTokens(uint amount) public payable setTime isInvestor isPrivateStage{
        require(amount <= privateTokens, "not enought tokens!");
        require(amount <= 100000, "Limit 100000");
        require(amount * privateTokenPrice <= msg.value, "not enought wei!");
        token.transfer( msg.sender, amount);
        privateTokens -= amount;
        privateTokensOnUser[msg.sender] += amount;
    }

    function giftTokens(uint tokens, address to, uint typeToken) public setTime isRegister{
        require(typeToken == 0 || typeToken == 1 || typeToken == 2, "not find type Token !");  
        require(token.balanceOf(msg.sender) >= tokens, "not enought CMON Tokens !");
        token.tokensApprove(msg.sender, address(this), tokens);
        if (typeToken == 0) {
            require(users[msg.sender].seedTokens >= tokens, "not enought tokens!");
            token.transferFrom(msg.sender, to, tokens);
            users[msg.sender].seedTokens -= tokens;
            users[to].seedTokens += tokens;
        } else  if (typeToken == 1) {
            require(privateTokensOnUser[msg.sender] >= tokens, "not enought tokens!");
            token.transferFrom(msg.sender, to, tokens);
            privateTokensOnUser[to] += tokens;
            privateTokensOnUser[msg.sender] -= tokens;
        } else{
            require(publicTokensOnUser[msg.sender] >= tokens, "not enought tokens!");
            token.transferFrom(msg.sender, to, tokens);
            publicTokensOnUser[to] += tokens;
            publicTokensOnUser[msg.sender] -= tokens;
        } 
    }

    function getBounty(uint tokens, address to) public payable setTime isPublicProvider isPublicStage{
        require(publicTokens >= tokens, "not enought tokens");
        require(tokens * publicTokenPrice <= msg.value, "not enought wei!");
        token.transfer(to, tokens);
        publicTokens -= tokens;
        publicTokensOnUser[to] += tokens;
    }

    function getRequests() public view returns(address[] memory) {
        return requestAdresses;
    }

    function ownerGift(address to, uint amount) public onlyOwner{
        token.transfer(to, amount);
    }

    fallback() external payable {
        changeTime();
    }
    receive() external payable {
        changeTime();
    }
    
}