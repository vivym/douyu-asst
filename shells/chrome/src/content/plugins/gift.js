const Plugin = require('./plugin');
const { sleep, waitForDom, getReactInstance } = require('../../utils');

class GiftPlugin extends Plugin {
  constructor (setting, reactAgent) {
    super();
    this.setting = setting;
    this.reactAgent = reactAgent;
  }

  giftHandler (gift) {
    if (gift.id === 20226 || gift.id === 20005) {
      gift.batchDesc = [ '口嗨1小时', '妹妹微信', '我无聊哥出狱辣', '你在想P吃' ];
      gift.batchNumArr = [ 10, 500, 1000, 9999 ];
      gift.intro = '赠送500个超火，您将获得妹妹微信';
    } else if (gift.id === 20000) { // 鱼丸
      gift.batchDesc = [ '长长久久', '赞一发', '我爱你', '一生一世', '溜溜溜' ];
      gift.batchNumArr = [ 99, 233, 520, 1314, 6666 ];
    } else if (gift.id === 20137) { // 荒古宝典
      gift.batchDesc = [ '长长久久', '赞一发', '我爱你', '一生一世', '溜溜溜' ];
      gift.batchNumArr = [ 99, 233, 520, 1314, 6666 ];
    } else if (gift.id === 20138) { // 挑战书
      gift.batchDesc = [ '长长久久', '赞一发', '我爱你', '一生一世', '溜溜溜' ];
      gift.batchNumArr = [ 99, 233, 520, 1314, 6666 ];
    }
  }

  async install () {
    waitForDom('.Backpack').then(el => {
      const inst = getReactInstance(el);
      if (inst) {
        const { batchGiftConfigs, propGiftConfigs } = inst.stateNode.props;
        const batchInfo = {
          isBatch: 1,
          descList: [ '长长久久', '赞一发', '我爱你', '一生一世', '溜溜溜' ],
          numList: [ 99, 233, 520, 1314, 6666 ],
        };
        Object.keys(propGiftConfigs).forEach(id => {
          if (!batchGiftConfigs[id]) {
            batchGiftConfigs[id] = batchInfo;
          }
        });
      }
    });
    while (true) {
      try {
        const { giftData } = window.RoomApp.container.registry.store.getState();
        const { allGift } = giftData;
        if (allGift.length > 0) {
          allGift.forEach(gift => {
            this.giftHandler(gift);
          });
          break;
        }
      } catch (err) {
        // do nothing
      }
      await sleep(333);
    }
  }
};

module.exports = GiftPlugin;
