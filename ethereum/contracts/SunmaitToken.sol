pragma solidity ^0.4.21;

import "openzeppelin-solidity/contracts/token/ERC20/StandardToken.sol";
import "openzeppelin-solidity/contracts/ownership/Ownable.sol";

contract SunmaitToken is StandardToken, Ownable {
    address public crowdsaleAddress = address(0);

    string public name = "Sunmait Token";
    string public symbol = "SNMT";
    uint8 public decimals = 18;

    uint256 public icoStartTimeStamp;
    uint256 public icoDurationSeconds;

    constructor () public {
        totalSupply_ = 100000 * (uint256(10) ** decimals);

        // solium-disable-next-line security/no-block-members
        icoStartTimeStamp = now;
        icoDurationSeconds = 4 * 7 * 24 * 60 * 60; // 4 weeks (in seconds)
    }

    function setCrowdsaleContract(address crowdsale) public onlyOwner returns (bool) {
        require(crowdsaleAddress == address(0));

        crowdsaleAddress = crowdsale;
        balances[crowdsaleAddress] = totalSupply_;

        return true;
    }

    function transferFromCrowdsale(address _to, uint256 _value) public whenIcoInProgress returns (bool) {
        require(msg.sender == crowdsaleAddress);
        return super.transfer(_to, _value);
    }

    function transfer(address _to, uint256 _value) public whenIcoFinished returns (bool) {
        return super.transfer(_to, _value);
    }

    function transferFrom(address _from, address _to, uint256 _value) public whenIcoFinished returns (bool) {
        return super.transferFrom(_from, _to, _value);
    }

    function approve(address _spender, uint256 _value) public whenIcoFinished returns (bool) {
        return super.approve(_spender, _value);
    }

    function increaseApproval(address _spender, uint _addedValue) public whenIcoFinished returns (bool success) {
        return super.increaseApproval(_spender, _addedValue);
    }

    function decreaseApproval(address _spender, uint _subtractedValue) public whenIcoFinished returns (bool success) {
        return super.decreaseApproval(_spender, _subtractedValue);
    }

    modifier whenIcoInProgress() {
        // solium-disable-next-line security/no-block-members
        require(now >= icoStartTimeStamp);
        // solium-disable-next-line security/no-block-members
        require(now <= (icoStartTimeStamp + icoDurationSeconds));
        _;
    }

    modifier whenIcoFinished() {
        // solium-disable-next-line security/no-block-members
        require(now > (icoStartTimeStamp + icoDurationSeconds));
        _;
    }
}