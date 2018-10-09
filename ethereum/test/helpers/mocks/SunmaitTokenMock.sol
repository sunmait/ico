pragma solidity ^0.4.21;

import "../../../contracts/SunmaitToken.sol";

contract SunmaitTokenMock is SunmaitToken {
    function setCrowdsaleContractMock(address crowdsale, uint256 icoStartTimeStamp_, uint256 icoEndTimeStamp_) public onlyOwner returns (bool) {
        require(crowdsaleAddress == address(0));

        crowdsaleAddress = crowdsale;
        balances[crowdsaleAddress] = totalSupply_;

        icoStartTimeStamp = icoStartTimeStamp_;
        icoEndTimeStamp = icoEndTimeStamp_;

        return true;
    }
}