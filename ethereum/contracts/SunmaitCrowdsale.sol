pragma solidity ^0.4.21;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./SunmaitToken.sol";

contract SunmaitCrowdsale is Ownable {
    using SafeMath for uint256;
    
    enum State { NotRunning, Phase1, Phase2 }

    SunmaitToken public tokenReward;

    uint256 public phase1weiRaised = 0;
    uint256 public phase2weiRaised = 0;
    uint256 public totalRaised = 0;

    uint256 public phase1OpeningTime;
    uint256 public phase1ClosingTime;
    uint256 public phase2OpeningTime;
    uint256 public phase2ClosingTime;

    uint256 public constant PHASE1_RATE = 20000;
    uint256 public constant PHASE2_RATE = 15000;

    // TODO: Pass parameters using constructor
    constructor (address tokenRewardAddress) public {
        require(tokenRewardAddress != address(0));

        tokenReward = SunmaitToken(tokenRewardAddress);

        phase1OpeningTime = now;
        phase1ClosingTime = phase1OpeningTime + (2 * 7 * 24 * 60 * 60); // 2 weeks (in seconds)

        phase2OpeningTime = phase1ClosingTime + (7 * 24 * 60 * 60); // 1 week after 1st phase closing (in seconds)
        phase2ClosingTime = phase2OpeningTime + (7 * 24 * 60 * 60); // duration of 2nd phase - 1 week (in seconds)
    }

    function () external payable {
        uint256 weiAmount = msg.value;
        State currentState = getCurrentState();

        require(currentState != State.NotRunning);

        _preValidatePurchase(msg.sender, weiAmount, currentState);

        uint256 tokenAmount = 0;
        if (currentState == State.Phase1) {
            tokenAmount = weiAmount.mul(PHASE1_RATE);
            phase1weiRaised.add(weiAmount);
        }
        else if (currentState == State.Phase2) {
            tokenAmount = weiAmount.mul(PHASE2_RATE);
            phase2weiRaised.add(weiAmount);
        }

        totalRaised.add(weiAmount);

        tokenReward.transferFromCrowdsale(msg.sender, tokenAmount);
        // TODO: move ethers to wallet
    }

    function getCurrentState() public view returns(State) {
        State currentState = State.NotRunning;

        if (now >= phase1OpeningTime && now < phase1ClosingTime) {
            currentState = State.Phase1;
        }
        else if (now >= phase2OpeningTime && now < phase2ClosingTime) {
            currentState = State.Phase2;
        }

        return currentState;
    }

    function _preValidatePurchase(address beneficiary, uint256 weiAmount, State currentState) internal view {
        require(beneficiary != address(0));
        require(weiAmount != 0);
        require(currentState != State.NotRunning);
    }
}