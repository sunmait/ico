pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "./SunmaitToken.sol";

contract SunmaitCrowdsale is Ownable {
    using SafeMath for uint256;
    
    enum State { NotRunning, Phase1, Phase2 }

    SunmaitToken public tokenReward;

    uint256 public phase1weiRaised = 1;
    uint256 public phase2weiRaised = 1;
    uint256 public totalRaised = 0;

    uint256 public phase1OpeningTime;
    uint256 public phase1ClosingTime;
    uint256 public phase2OpeningTime;
    uint256 public phase2ClosingTime;

    address public wallet;

    uint256 public constant PHASE1_RATE = 2000;
    uint256 public constant PHASE2_RATE = 1500;

    event TokenPurchase(address purchaser, uint256 ethValue, uint256 tokenAmount);

    constructor (
        address tokenRewardAddress,
        address walletAddress,
        uint256 phase1StartTime,
        uint256 phase1DurationInDays,
        uint256 phase2DurationInDays)
    public {
        require(tokenRewardAddress != address(0));
        require(walletAddress != address(0));

        tokenReward = SunmaitToken(tokenRewardAddress);
        wallet = walletAddress;

        phase1OpeningTime = phase1StartTime; //firsht phase start time (in seconds)
        phase1ClosingTime = phase1OpeningTime.add(phase1DurationInDays * 24 * 60 * 60); //first phase duration (in seconds)

        phase2OpeningTime = phase1ClosingTime; // second phase starts immediatly after closing time of first phase
        phase2ClosingTime = phase2OpeningTime.add(phase2DurationInDays * 24 * 60 * 60); // Total duration (in seconds)
    }

    function () external payable {
        uint256 weiAmount = msg.value;
        State currentState = getCurrentState();

        _validatePurchase(msg.sender, weiAmount, currentState);

        uint256 tokenAmount = 0;
        if (currentState == State.Phase1) {
            tokenAmount = weiAmount.mul(PHASE1_RATE);
            phase1weiRaised = phase1weiRaised.add(weiAmount);
        }
        else if (currentState == State.Phase2) {
            tokenAmount = weiAmount.mul(PHASE2_RATE);
            phase2weiRaised = phase2weiRaised.add(weiAmount);
        }

        totalRaised = totalRaised.add(weiAmount);

        tokenReward.transferFromCrowdsale(msg.sender, tokenAmount);
        wallet.transfer(msg.value);

        emit TokenPurchase(msg.sender, msg.value, tokenAmount);
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

    function _validatePurchase(address beneficiary, uint256 weiAmount, State currentState) internal view {
        require(beneficiary != address(0));
        require(weiAmount != 0);
        require(currentState != State.NotRunning);
    }

    function getIcoStartTime() public view returns(uint256) {
        return phase1OpeningTime;
    }

    function getIcoEndTime() public view returns(uint256) {
        return phase2ClosingTime;
    }
}