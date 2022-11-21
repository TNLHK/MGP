"use strict"

const { nodemw } = require('nodemw')
const bot = new MediaWikiJS(require('./config.json').mzh)
bot
	.login()
	.then(async () => {
		try {
			const result0 = await bot.api.get({
				action: 'query',
				prop: 'links',
				titles: 'User talk:TNLHK/作死报',
				pllimit: 'max',
			})
			console.log(`共${result0.query.pages[0].links.length}个页面。`);
			for (let i = 0; i < result0.query.pages[0].links.length; i++) {
				try {
					console.log(`第${i+1}个页面：${result0.query.pages[0].links[i].title}。`);
					const result1 = await bot.doEdit({
						title: result0.query.pages[0].links[i].title,
						appendtext: '\n{{safesubst:U:TNLHK/萌百作死报}}<span style="display:none;">{{mute|{{safesubst:ROOTPAGENAME}}}} ，您定的作死报已送达，请查收！~~~</span>',
						summary: '新的一期《[[U:TNLHK/萌百作死报|作死报]]》已送达，请注意查收~',
						tags: 'Bot',
						Bot: true,
					});
					console.log(result1.edit);
				} catch (e1) {
					console.error(e1);
				}
			}
		} catch (e0) {
			console.error(e0);
		}  
	})
