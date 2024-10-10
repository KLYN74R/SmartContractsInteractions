// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract MyToken {
    string public name = "KlyntarETH";
    string public symbol = "KETH";
    uint8 public decimals = 18;
    uint256 public totalSupply = 1000 * (10 ** uint256(decimals));
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    address public initialAddress = 0x1234567890123456789012345678901234567890; 

    constructor() {
        balanceOf[initialAddress] = 100 * (10 ** uint256(decimals));
        balanceOf[msg.sender] = totalSupply - balanceOf[initialAddress];
    }

    event Transfer(address indexed from, address indexed to, uint256 value);

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(balanceOf[msg.sender] >= _value, "Not enough tokens");
        balanceOf[msg.sender] -= _value;
        balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    event Approval(address indexed owner, address indexed spender, uint256 value);

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= balanceOf[_from], "Not enough tokens");
        require(_value <= allowance[_from][msg.sender], "Allowance exceeded");
        balanceOf[_from] -= _value;
        balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
