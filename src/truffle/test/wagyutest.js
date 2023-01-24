const Wagyu = artifacts.require('WagyuInfo');
contract('Wagyu', () => {
    it('Should deploy smart contract properly', async () => {
        const wagyu = await Wagyu.deployed();
        console.log(wagyu.address);
        assert(wagyu.address != '')
    });
    it('Should able to input and output the item references by wagyuID properly', async() => {
        const wagyu = await Wagyu.deployed();
        await wagyu.addWagyu("CowA201", 12, "Wagyu", "A2", "James","America","halal");
        const wagyuinfo = await wagyu.getWagyuInfo("CowA201");
        console.log(wagyuinfo);
        assert(wagyuinfo.toString() != '');
    });
    it('Should able to retrieve all wagyuID properly', async() => {
        const wagyu = await Wagyu.deployed();
        const data = await wagyu.getwagyuID();
        console.log(data);
        assert(data.toString() != '');
    });
});