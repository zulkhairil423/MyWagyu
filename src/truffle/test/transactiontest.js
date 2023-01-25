const Transaction = artifacts.require('WagyuTransaction');
contract('Transaction', () => {
    it('Should deploy smart contract properly', async () => {
        const trans = await Transaction.deployed();
        console.log(trans.address);
        assert(trans.address != '')
    });
    it('Should able to change the availability of wagyu', async() => {
        const trans = await Transaction.deployed();
        await trans.wagyuUnavailability("CowA201");
        console.log(trans);
        assert(trans.address != '');
    });
});