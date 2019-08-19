
const utils = {
  random_cn_name(){
    const humanNameFirst = "赵,钱,孙,李,周,吴,郑,王,冯,陈,褚,卫,蒋,沈,韩,杨,朱,秦,尤,许,何,吕,施,张,孔,曹,严,华,金,魏,陶,姜,戚,谢,邹,喻,柏,水,窦,章,云,苏,潘,葛,奚,范,彭,郎,鲁,韦,昌,马,苗,凤,花,方,俞,任,袁,柳,邓,鲍,史,唐,费,廉,岑,薛,雷,贺,倪,汤,藤,殷,罗,毕,郝,邬,安,常,乐,于,时,付,皮,卞,齐,康,伍,余,元,卜,顾,孟,平,黄,和,穆,肖,尹,姚,邵,湛,汪,祁,毛,禹,狄,米,贝,明,藏,计,伏,成,戴谈,宋茅,庞,熊,纪舒,董梁,杜阮,蓝闵,席季,麻强,贾路,娄危,郭,梅,盛林,刁钟,徐,邱,骆高,夏蔡,田,樊,胡,凌,霍,虞,万,支,柯,昝,管,卢,莫,经,房,裘,缪,干,解,应,宗,丁,宣,贲,郁,单,杭,洪,包,诸,左,石,崔,吉,钮,龚,程,嵇,邢,滑,裴,陆,荣,翁,荀,羊,惠,甄,曲,家,封,芮,羿,储,靳,汲,邴,糜,松,井,段,富,巫,乌,焦,巴,弓,牧,隗,山,谷,车,侯,宓,蓬,全,郗,班,仰,秋,仲,伊,宫,宁,仇,栾,暴,甘,钭,厉,戎,祖,武,符,刘,景,詹,束,龙,叶,幸,司,韶,郜,黎,蓟,薄,印,宿,白,怀,蒲,邰,从,鄂,索,咸,籍,赖,卓,蔺,屠,蒙,池,乔,阴,胥,能,苍,双,闻,莘,党,翟,谭,贡,劳,逄,姬,申,扶,堵,冉,宰,郦,雍,隙,璩,桑,桂,濮,牛,寿,通,边,扈,燕,冀,郏,浦,尚,农,温,别,庄,晏,柴,瞿,阎,充,慕,连,茹,习,宦,艾,容,向,古,易,慎,戈,廖,庾,终,暨,居,衡,步,都,耿,满,弘,匡,文,国,寇,广,禄,阙,东,欧,殳,沃,利,蔚,越,夔,隆,师,巩,厍,聂,晁,勾,敖,融,冷,訾,辛,阚,那,简,饶,空,曾,毋,沙,乜,养,鞠,须,丰,巢,关,蒯,相,查,后,荆,红,游,竺,权,逯,盖,益,桓,公,俟,上官,欧阳,夏候,诸葛,闻人,东方,赫连,皇甫,尉迟,公羊,澹台,公冶,宗政,濮阳,淳于,单于,太叔,申屠,公孙,仲孙,轩辕,令狐,钟离,宇文,长孙,慕容,鲜于,闾丘,司徒,司空,亓官,司寇,仉督,子车,颛孙,端木,巫马,公西,漆雕,乐正,壤驷,公良,拓拔,夹谷,宰父,谷梁,楚,晋,闫,法,汝,鄢,涂,钦,段干,百里,东郭,南门,呼延,归海,羊舌,微生,岳,帅,缑,亢,况,有,琴,梁丘,左丘,东门,西门,商,牟,佘,耳,伯,赏,南宫,墨,哈,谯笪,年,爱,阳,佟,言,福".split(",")

    const humanNameDoubleForThree = "之玉,越泽,锦程,修杰,烨伟,尔曼,立辉,致远,天思,友绿,聪健,修洁,访琴,初彤,谷雪,平灵,源智,烨华,振家,越彬,子轩,伟宸,晋鹏,觅松,海亦,雨珍,浩宇,嘉熙,志泽,苑博,念波,峻熙,俊驰,聪展,南松,问旋,黎昕,谷波,凝海,靖易,芷烟,渊思,煜祺,乐驹,风华,睿渊,博超,天磊,夜白,初晴,瑾瑜,鹏飞,弘文,伟泽,迎松,雨泽,鹏笑,诗云,白易,远航,笑白,映波,代桃,晓啸,智宸,晓博,靖琪,十八,君浩,绍辉,冷安,盼旋,秋白,天德,铁身,老黑,半邪,半山,一江,冰安,皓轩,子默,熠彤,青寒,烨磊,愚志,飞风,问筠,旭尧,妙海,平文,冷之,尔阳,天宇,正豪,文博,明辉,行恶,哲瀚,子骞,泽洋,灵竹,幼旋,百招,不斜,擎汉,千万,高烽,大开,不正,伟帮,如豹,三德,三毒,连虎,复天,牛青,擎苍,思远,强炫,寄灵,盼秋,怜烟,浩然,明杰,昊焱,伟诚,剑通,鹏涛,鑫磊,醉薇,尔蓝,靖仇,成风,豪英,若风,难破,德地,无施,追命,成协,人达,亿先,不评,成威,成败,难胜,人英,忘幽,世德,世平,广山,德天,人雄,人杰,不言,难摧,世立,老三,若之,成危,元龙,成仁,若剑,难敌,浩阑,士晋,铸海,人龙,伯云,老头,南风,擎宇,浩轩,煜城,博涛,问安,烨霖,天佑,明雪,书芹,半雪,伟祺,从安,寻菡,秋寒,谷槐,文轩,立诚,立果,明轩,楷瑞,炎彬,鹏煊,幼南,沛山,不尤,道天,剑愁,千筹,广缘,天奇,道罡,远望,乘风,剑心,道之,乘云,绝施,冥幽,天抒,剑成,士萧,文龙,一鸣,剑鬼,半仙,万言,剑封,远锋,天与,元正,世开,不凡,断缘,中道,绝悟,道消,断秋,远山,蓝血,无招,无极,鬼神,满天,飞扬,醉山,语堂,懿轩,雅阳,鑫鹏,文昊,松思,水云,山柳,荣轩,绮彤,沛白,慕蕊,觅云,鹭洋,立轩,金鑫,健柏,建辉,鹤轩,昊强,凡梦,代丝,远侵,一斩,一笑,一刀,行天,无血,无剑,无敌,万怨,万天,万声,万恶,万仇,天问,天寿,送终,山河,三问,如花,灭龙,聋五,绝义,绝山,剑身,浩天,非笑,恶天,断天,仇血,仇天,沧海,不二,碧空,半鬼,文涛,晓刚,洪纲,砖家,叫兽,傀儡,安邦,安福,安歌,安国,安和,安康,安澜,安民,安宁,安平,安然,安顺,安翔,安晏,安宜,安怡,安易,安志,昂然,昂雄,宾白,宾鸿,宾实,彬彬,彬炳,彬郁,斌斌,斌蔚,滨海,波光,波鸿,波峻,波涛,博瀚,博达,博厚,博简,博明,博容,博赡,博涉,博实,博文,博学,博雅,博延,博艺,博易,博裕,博远,才捷,才良,才艺,才英,才哲,才俊,成和,成弘,成化,成济,成礼,成龙,成双,成天,成文,成业,成益,成荫,成周,承安,承弼,承德,承恩,承福,承基,承教,承平,承嗣,承天,承望,承宣,承颜,承业,承悦,承允,承运,承载,承泽,承志,德本,德海,德厚,德华,德辉,德惠,德容,德润,德寿,德水,德馨,德曜,德业,德义,德庸,德佑,德宇,德元,德运,德泽,德明,飞昂,飞白,飞飙,飞掣,飞尘,飞沉,飞驰,飞光,飞翰,飞航,飞翮,飞鸿,飞虎,飞捷,飞龙,飞鸾,飞鸣,飞鹏,飞文,飞翔,飞星,飞翼,飞英,飞宇,飞羽,飞雨,飞语,飞跃,飞章,飞舟,丰茂,丰羽,刚豪,刚洁,刚捷,刚毅,高昂,高岑,高畅,高超,高驰,高达,高澹,高飞,高芬,高峯,高峰,高歌,高格,高寒,高翰,高杰,晗日,涵畅,涵涤,涵亮,涵忍,涵容,涵润,涵涵,涵煦,涵蓄,涵衍,涵意,涵映,涵育,翰采,翰池,翰飞,翰海,翰翮,翰林,翰墨,翰学,翰音,瀚玥,翰藻,瀚海,瀚漠,昊苍,昊昊,昊空,昊乾,昊穹,昊然,昊天,昊英,浩波,浩博,浩初,浩大,浩宕,浩荡,浩歌,浩广,浩涆,浩瀚,浩浩,浩慨,浩旷,浩阔,浩漫,浩淼,浩渺,浩邈,浩气,浩穰,浩壤,浩思,浩言,和蔼,和安,和璧,和昶,和畅,和风,和歌,和光,和平,和洽,和惬,和顺,和硕,和颂,和泰,和悌,和通,和同,和煦,和雅,和宜,和怡,和玉,和裕,和豫,和悦,和韵,和泽,和正,和志,弘博,弘大,弘方,弘光,弘和,弘厚,弘化,弘济,弘阔,弘亮,弘量,弘深,弘盛,弘图,弘伟,弘新,弘雅,弘扬,弘业,弘义,弘益,弘毅,弘懿,弘致,弘壮,宏伯,宏博,宏才,宏畅,宏达,宏大,宏放,宏富,宏峻,宏浚,宏恺,宏旷,宏阔,宏朗,宏茂,宏邈,宏儒,宏深,宏胜,宏盛,宏爽,宏硕,宏伟,宏扬,宏义,宏逸,宏毅,宏远,宏壮,鸿宝,鸿波,鸿博,鸿才,鸿彩,鸿畅,鸿畴,鸿达,鸿德,鸿飞,鸿风,鸿福,鸿光,鸿晖,鸿朗,鸿文,鸿熙,鸿羲,鸿禧,鸿信,鸿轩,鸿雪,鸿羽,鸿远,鸿云,鸿运,鸿哲,鸿祯,鸿振,鸿志,鸿卓,华奥,华采,华彩,华灿,华藏,华池,华翰,华皓,华晖,华辉,华茂,华美,华清,华荣,华容,嘉赐,嘉德,嘉福,嘉良,嘉茂,嘉木,嘉慕,嘉纳,嘉年,嘉平,嘉庆,嘉荣,嘉容,嘉瑞,嘉胜,嘉石,嘉实,嘉树,嘉澍,嘉禧,嘉祥,嘉歆,嘉许,嘉勋,嘉言,嘉谊,嘉颖,嘉佑,嘉玉,嘉誉,嘉悦,嘉运,嘉泽,嘉珍,嘉祯,嘉志,嘉致,坚白,坚壁,坚秉,坚成,坚诚,建安,建白,建柏,建本,建弼,建德,建华,建明,建茗,建木,建树,建同,建修,建业,建义,建元,建章,建中,经赋,经亘,经国,经略,经纶,经纬,经武,经业,经义,经艺,景澄,景福,景焕,景辉,景龙,景明,景山,景胜,景铄,景天,景同,景曜,君昊,俊艾,俊拔,俊弼,俊才,俊材,俊楚,俊达,俊德,俊发,俊风,俊豪,俊健,俊杰,俊捷,俊郎,俊力,俊良,俊迈,俊茂,俊美,俊民,俊名,俊明,俊楠,俊能,俊人,俊爽,俊悟,俊晤,俊侠,俊贤,俊雄,俊雅,俊彦,俊逸,俊英,俊友,俊语,俊誉,俊远,俊哲,俊喆,俊智,季萌,季同,开畅,开诚,开宇,开济,开霁,开朗,凯安,凯唱,凯定,凯风,凯复,凯歌,凯捷,凯凯,凯康,凯乐,凯旋,凯泽,恺歌,恺乐,康安,康伯,康成,康德,康复,康健,康乐,康宁,康平,康胜,康盛,康时,康适,康顺,康泰,康裕,乐安,乐邦,乐成,乐池,乐和,乐家,乐康,乐人,乐容,乐山,乐生,乐圣,乐水,乐天,乐童,乐贤,乐心,乐欣,乐逸,乐意,乐音,乐咏,乐游,乐语,乐悦,乐湛,乐章,乐正,乐志,黎明,力夫,力强,力勤,力行,力学,力言,立人,立群,良奥,良弼,良才,良材,良策,良畴,良工,良翰,良吉,良骥,良俊,良骏,良朋,良平,良哲,理群,理全,茂才,茂材,茂德,茂典,茂实,茂学,茂勋,茂彦,敏博,敏才,敏达,敏叡,敏学,敏智,明诚,明达,明德,明俊,明朗,明亮,明旭,明煦,明远,明哲,明喆,明知,明志,明智,明珠,朋兴,朋义,彭勃,彭薄,彭湃,彭彭,彭魄,彭越,彭泽,彭祖,鹏程,鹏池,鹏赋,鹏海,鹏鲸,鹏举,鹏鹍,鹏鲲,鹏天,鹏翼,鹏云,鹏运,濮存,溥心,璞玉,璞瑜,浦和,浦泽,奇略,奇迈,奇胜,奇水,奇思,奇邃,奇伟,奇玮,奇文,奇希,奇逸,奇正,奇志,奇致,祺福,祺然,祺祥,祺瑞,琪睿,庆生,锐达,锐锋,锐翰,锐进,锐精,锐立,锐利,锐思,锐逸,锐意,锐藻,锐泽,锐阵,锐志,锐智,睿博,睿才,睿诚,睿慈,睿聪,睿达,睿德,睿范,睿广,睿好,睿明,睿识,睿思,绍钧,绍祺,绍元,升荣,圣杰,思聪,思淼,思源,思博,斯年,斯伯,泰初,泰和,泰河,泰鸿,泰华,泰宁,泰平,泰清,泰然,天材,天成,天赋,天干,天罡,天工,天翰,天和,天华,天骄,天空,天禄,天路,天瑞,天睿,天逸,天元,天韵,天泽,天纵,同方,同甫,同光,同和,同化,同济,巍昂,巍然,巍奕,伟博,伟毅,伟才,伟茂,伟懋,伟彦,伟晔,伟兆,伟志,温纶,温茂,温书,温韦,温文,温瑜,文柏,文昌,文成,文德,文栋,文赋,文光,文翰,文虹,文华,文康,文乐,文林,文敏,文瑞,文山,文石,文星,文宣,文彦,文曜,文耀,文斌,文彬,文滨,向晨,向笛,向文,向明,向荣,向阳,翔宇,翔飞,项禹,项明,心水,心思,心远,欣德,欣嘉,欣可,欣然,欣荣,欣怡,欣怿,欣悦,新翰,新霁,新觉,新立,新荣,新知,信鸿,信厚,信鸥,信然,信瑞,兴安,兴邦,兴昌,兴朝,兴德,兴发,兴国,兴怀,兴平,兴庆,兴生,兴思,兴腾,兴旺,兴为,兴文,兴贤,兴修,兴学,兴言,兴业,兴运,星波,星辰,星驰,星光,星海,星汉,星河,星华,星晖,星火,星剑,星津,星阑,星纬,星文,星宇,星雨,星渊,星洲,修诚,修德,修谨,修筠,修明,修能,修平,修齐,修然,修为,修伟,修文,修雅,修永,修远,修真,修竹,修贤,炫明,学博,学海,学林,学民,学名,学文,学义,学真,雪松,雪峰,雪风,雅昶,雅畅,雅达,雅惠,雅健,雅珺,雅逸,雅懿,雅志,阳飙,阳飇,阳冰,阳波,阳伯,阳成,阳德,阳华,阳晖,阳辉,阳嘉,阳平,阳秋,阳荣,阳舒,阳朔,阳文,阳曦,阳夏,阳旭,阳煦,阳炎,阳焱,阳曜,阳羽,阳云,阳泽,阳州,烨赫,烨然,烨烁,烨烨,烨熠,烨煜,毅然,逸仙,逸明,逸春,宜春,宜民,宜年,宜然,宜人,宜修,意远,意蕴,意致,意智,英飙,英博,英才,英达,英发,英范,英光,英豪,英华,英杰,英朗,英锐,英睿,英叡,英韶,英卫,英武,英悟,英勋,英彦,英耀,英奕,英逸,英毅,英哲,英喆,英卓,英资,英纵,永怡,永春,永安,永昌,永长,永丰,永福,永嘉,永康,永年,永宁,永寿,永思,永望,永新,永言,永逸,永元,永贞,咏德,咏歌,咏思,咏志,勇男,勇军,勇捷,勇锐,勇毅,宇达,宇航,宇寰,宇文,宇荫,雨伯,雨华,雨石,雨信,雨星,玉宸,玉成,玉龙,玉泉,玉山,玉石,玉书,玉树,玉堂,玉轩,玉宇,玉韵,玉泽,元白,元德,元化,元基,元嘉,元甲,元驹,元凯,元恺,元魁,元良,元亮,元明,元青,元思,元纬,元武,元勋,元忠,元洲,苑杰,蕴涵,蕴和,蕴藉,展鹏,哲茂,哲圣,哲彦,振海,振国,正诚,正初,正德,正浩,正平,正奇,正青,正卿,正文,正祥,正信,正雅,正阳,正业,正谊,正真,正志,志诚,志新,志勇,志明,志国,志强,志尚,志专,志文,志行,志学,志业,志义,志用,智明,智鑫,智勇,智敏,智志,智渊,子安,子晋,子民,子明,子墨,子平,子琪,子石,子实,子真,子濯,子昂,子瑜,自明,自强,作人,自怡,自珍,曾琪,泽宇,泽语,文纲,全盛,一立,明刚,广利,明兵,成杲,鞘巧,民尧,子志,珍国,立言,明恩,有刚,天放,城海,家儿,林山,维东,定水,从桐,罗荣,竟泉,庭颂,瑾丁,海咏,臣钊,觐音,欣驹,粤兴,汛络,赞石,甲辰,忡暄,森滕,好翔,廖昭,珈树,序纤,兰北,健贝,化江,卿风,荣淩,云祥,翼锐,源韵,修树,世贝,罕伯,忻循,河根,帅泰,逢侠,余清,君帆,誉珞,翊余,峥凛,建峰,巳保,延晔,童泓,继钦,炳珅,朝言,宽桦,薛仁,斐书,越哲,三澧,月旭,房枫,克晗,翔昊,居浩,敬亚,楗名,浙侯,蒙政,恭和,时颜,言春,福奋,涟树,源嘉,起贝,余艺,林廉,易鸥,袭锐,术仕,稼岭,俨休,攀檬,作尧,发有,舡邱,盼曾,石航,啸琦,书月,岐顶,贝焱,加喜,总岚,渺峰,廷争,厚正,庚希,徽万,咚佩,亚怿,振涛,眧变,励舫,贵成,忻絮,东琥,迪寿,苏石,愉柠,帆粼,中羽,仔城,仲丰,尚鹳,墁字,乐淏,远龙,禹冰,东航,豫镔,瞿勇,刘洋,敏缨,正晗,淮通,本嶙,羽熙,援坝,义轶,华泉,华琨,勰垚,哲恒,星玺,劲雄,琛淦,细烨,泳科,浩韵,裕逾,蒋鑫,虎杰,咏祺,新栋,溢邝,译浚,罗晨,汩远,致厚,峥凯,观霄,攀泰,基铫,坤奥,旻谌,俶太,越标,丞柏,定星,传梁,宇家,羿渡,绎桦,才烨,又尉,延一,汇翰,忠沥,泓玢,民泳,和佟,健谕,熙行,博贝,强愉,坜肃,佑清,磊荞,啸敏,炳逸,乔鲁,初翱,莜咚,着湘,然溟,湉洲,怀安,富文,治军,天宝,厚德,道海,天亮,家新,龙泉,长生,勇明,铁剑,后平,明海,学能,章建,日星,必红,皓洪,荣玮,从为,勃榛,责号,弈涟,健谣,袁联,幼星,子玥,树柏,小潼,楣超,光问,军健,琦慧,杪耒,嘉毛,章容,育剑,必吉,埔塬,桂勋,林鹤,炳禄,体震,前代,佟怀,星发,瞬献,天裴,未宗,招树,跃少,广洲,相岩,绍彦,义学,汉聚,楷钊,彧冕,记阔,北峄,僮朦,轩岐,暖渔,浚同,兴豫,梓臻,宵根,会澄,召昉,勤尘,良严,洪见,增敏,懋活,勋羚,简珺,湛玮,湃非,树壮,庭玖,剑依,卓默,森若,佟骞,生宝,利万,炳施,栋天,沐磬,慕骅,枚钧,眙赫,泽珲,楷昊,施君,点禄,亚博,作焘,炫昶,琦溶,治先,啸乙,慎荣,岚乔,周东,信民,承扁,叮桥,睿逸,肇汐,懋阳,祺敏,玺棂,念依,治汐,刘航,昕沁,宣融,会琦,腊毛,舆烨,诚轩,善望,翔迎,向游,红沐,意计,旻鹏,火城,汩呈,兴晰,常闯,伯敏,自岑,玙梓,品恬,越帆,浩洲,甸册,警忱,源通,奥含,洪旭,当澳,泽良,禹挥,渤旻,曦昌,炯飒,校与,盛明,淩粤,伯录,美德,允醒,淳忆,湘馗,忻键,纪双,赫奋,彦慧,克程,政祝,楦冲,政劭,留画,佳臣,步明,仲修,穹澎,舂珺,滕石,玖庭,慕赫,泉析,含征,勃财,超坤,深贯,珥顺,语有,蜀耕,沄汇,山翀,复斗,实群,粟箬,彰续,筱涛,远赞,泉保,旖春,恩生,盼访,元吉,真百,佳熙,宪群,金建,思宏,乃义,成志,广乐,潮生,晋武,才文,世程,丰年,政举,兴品,洪才,一川,展翅,龙远,溢平,衡杏,廷博,泊燊,展江,京程,严泫,谦致,军驰,毓暄,祎淏,官成,洲袁,矜化,昭郁,智雷,孝桦,弘子,焱冯,强褰,咏双,沐联,昌仙,竟冠,启绒,云力,榛程,举尧,竹贤,寿宣,世枞,十诏,佳羲,冬熙,慈昱,滔甲,舟平,行屿,桓思,纪彦,恪闳,京爨,帧诚,慈意,先宝,来愚,允红,泳红,匡罕,满恒,相献,晋钫,建宽,濯永,昭沩,赫州,剀维,卓力,奎动,檀潮,健华,宓祖,计焕,明明,烨盼,昆刚,臣倪,贤耀,衡茂,斗锟,茂冰,朝森,升棵,支桐,贵潼,孺午,旻涛,训青,啸旌,起辉,楼生,其燠,淮键,辽郴,炙禺,禹尘,耀锟,允州,迩禾,萧瑟,宝逢,哲斌,皓涌,桁仲,曙回,幼镶,勋宽,百南,迎明,士艺,贺定,超培,柯楠,逢果,孔民,学坚,通裕,仁栋,令正,涵琛,晰晖,海起,於融,详功,尔震,浏天,溪善,翔棠,祉琨,广殊,圳兵,昆谳,立材,来棚,剑频,庄选,殊奥,援舰,水鹰,水盛,弘玄,石远,伯铼,益年,科恪,裕伟,毅家,伯喻,春雨,连暄,奚滔,桓贵,宸江,荆裕,澎乔,耕悦,细因,烽漳,壮君,运家,熠桥,羽郅,梓驿,加生,石诺,彭钛,昆楠,柱羿,石栓,永乙,周海,胥冉,泱有,转誉,湉灏,弘理,行兆,沧煜,之存,柯徽,丁忻,品蔚,正乐,箴员,芮百,柘厦,澹田,牧央,正旬,牧冲,之圳,风雨,继成,文健,光德,连生,正高,雨龙,清水,浙江,成显,纬国,海丰,青峰,四海,昌居,文彪,上腾,和明,德传,庭汛,怡承,之安,京由,珅员,拥缔,稀名,湘增,玄言,炎彦,勋润,宸滨,祯亚,炳驿,炫位,旻译,宝朗,则榛,广北,群轩,裔锭,旋坤,八喜,筱坚,纲奇,宾京,宸渤,建榆,扬溶,沛苇,楼凡,超贤,盈美,祥桀,尉斯,柏鸣,禹发,维峻,淄延,羿晖,卫升,与练,登悟,旭应,璞岩,伟宗,万洲,忠本,璐楠,艾垒,总涌,贺在,文松,达皋,怛奕,在囯,华桐,坤能,果俨,付潘,海言,贯与,秋简,明祯,甸嗣,用凯,琪洳,冬旃,小麟,曦坤,沉森,沁金,文平,烁亭,晞汶,燊彰,诩悦,瑾兼,桎沅,枳荞,勇晨,开扬,游颀,晟焙,继现,增廷,列漪,符武,聿军,桄生,树颢,林来,朗桥,润芪,轲赫,徐骧,畅跃,胜轩,德伦,作德,澍菘,光侪,宪允,丛挺,淇雩,加肖,蔚源,客丰,玙珣醉易,紫萱,紫霜,紫南,紫菱,紫蓝,紫翠,紫安,芷天,芷容,芷巧,芷卉,芷荷,之桃,元霜,元绿,元槐,元枫,语雪,语山,语蓉,语琴,语海,语芙,语儿,语蝶,雨雪,雨文,雨梅,雨莲,雨兰,幼丝,幼枫,又菡,友梅,友儿,映萱,映安,迎梦,迎波,易巧,亦丝,亦巧,忆雪,忆文,忆梅,忆枫,以丹,依丝,夜玉,夜梦,夜春,雁荷,雁风,雅彤,雅琴,寻梅,寻冬,雪珍,雪瑶,雪旋,雪卉,笑旋,笑蓝,笑翠,晓亦,晓夏,向梦,香萱,香岚,夏真,夏山,夏兰,惜雪,惜蕊,惜灵,问夏,问蕊,问梅,听筠,听枫,天曼,思松,思菱,水瑶,水彤,书竹,书易,诗桃,诗双,诗珊,诗蕊,山菡,山蝶,若雁,若菱,如风,如冬,如波,秋柔,青雪,青曼,巧蕊,千亦,千柔,千柳,绮琴,绮梅,平萱,平露,沛儿,盼烟,凝雁,凝安,念之,梦之,梦桃,寄文,寄琴,寒梦,寒荷,含灵,含蕾,海云,海冬,谷蕊,谷兰,飞珍,飞槐,访云,访烟,访天,访风,凡阳,凡旋,凡梅,凡灵,凡蕾,尔丝,尔柳,尔芙,尔白,孤菱,沛萍,梦柏,从阳,绿海,白梅,秋烟,访旋,元珊,凌旋,依珊,寻凝,幻柏,雨寒,寒安,怀绿,书琴,水香,向彤,曼冬,怜梦,安珊,映阳,思天,初珍,冷珍,海安,从彤,灵珊,夏彤,映菡,青筠,易真,幼荷,冷霜,凝旋,夜柳,紫文,凡桃,醉蝶,从云,冰萍,小萱,白筠,依云,元柏,丹烟,念云,易蓉,青易,友卉,若山,涵柳,映菱,依凝,怜南,水儿,从筠,千秋,代芙,之卉,幻丝,书瑶,含之,雪珊,海之,寄云,盼海,谷梦,雁兰,晓灵,向珊,宛筠,笑南,梦容,寄柔,静枫,尔容,沛蓝,宛海,迎彤,梦易,惜海,灵阳,念寒,采梦,夜绿,又亦,梦山,醉波,慕晴,安彤,半烟,翠桃,书蝶,寻云,冰绿,山雁,南莲,夜梅,翠阳,芷文,南露,向真,又晴,又蓝,雅旋,千儿,听安,凌蝶,向露,从凝,雨双,依白,以筠,含巧,晓瑶,忆山,以莲,冰海,盼芙,冰珍,半双,以冬,千凝,笑阳,香菱,友蕊,若云,天晴,笑珊,凡霜,南珍,晓霜,芷云,谷芹,芷蝶,雨柏,之云,靖巧,寄翠,涵菡,雁卉,涵山,念薇,绮兰,迎蕾,秋荷,代天,采波,诗兰,谷丝,凝琴,凝芙,尔风,觅双,忆灵,水蓝,书蕾,访枫,涵双,初阳,从梦,凝天,秋灵,笑槐,灵凡,冰夏,听露,翠容,绮晴,静柏,天亦,冷玉,以亦,盼曼,乐蕊,凡柔,曼凝,沛柔,迎蓉,映真,采文,曼文,新筠,碧玉,秋柳,白莲,亦玉,幻波,忆之,孤丝,妙竹,傲柏,元风,易烟,怀蕊,寻桃,映之,小玉,尔槐,听荷,赛君,闭月,不愁,羞花,紫寒,夏之,飞薇,如松,白安,秋翠,夜蓉,傲晴,凝丹,凌瑶,初曼,夜安,安荷,青柏,向松,绿旋,芷珍,凌晴,新儿,亦绿,雁丝,惜霜,紫青,冰双,映冬,代萱,梦旋,毒娘,紫萍,冰真,幻翠,向秋,海蓝,凌兰,如柏,千山,半凡,雁芙,白秋,平松,代梅,香之,梦寒,小蕊,慕卉,映梦,绿蝶,凌翠,夜蕾,含双,慕灵,碧琴,夏旋,冷雁,乐双,念梦,静丹,之柔,新瑶,亦旋,雪巧,中蓝,莹芝,一兰,清涟,盛男,凝莲,雪莲,依琴,绣连,友灵,醉柳,秋双,绮波,寄瑶,冰蝶,孤丹,半梅,友菱,飞双,醉冬,寡妇,沛容,南晴,太兰,紫易,从蓉,友易,尔竹,巧荷,寻双,芷雪,又夏,梦玉,安梦,凝荷,外绣,忆曼,不平,凝蝶,以寒,安南,思山,若翠,曼青,小珍,青荷,代容,孤云,慕青,寄凡,元容,丹琴,觅风,平彤,念露,翠彤,秋玲,安蕾,若蕊,灵萱,含雁,思真,盼山,香薇,碧萱,夏柳,白风,安双,凌萱,盼夏,幻巧,怜寒,傲儿,冰枫,如萱,妖丽,元芹,涵阳,涵蕾,以旋,高丽,灭男,代玉,可仁,可兰,可愁,可燕,妙彤,易槐,小凝,妙晴,冰薇,涵柏,语兰,小蕾,忆翠,听云,觅海,静竹,初蓝,迎丝,幻香,含芙,夏波,冰香,凌香,妙菱,访彤,凡雁,紫真,书双,问晴,惜萱,白萱,靖柔,凡白,晓曼,曼岚,雁菱,雨安,谷菱,夏烟,问儿,青亦,夏槐,含蕊,迎南,又琴,冷松,安雁,飞荷,踏歌,秋莲,盼波,以蕊,盼兰,之槐,飞柏,孤容,白玉,傲南,山芙,夏青,雁山,曼梅,如霜,沛芹,丹萱,翠霜,玉兰,汝燕,不乐,不悔,可冥,若男,素阴,元彤,从丹,曼彤,惋庭,起眸,香芦,绿竹,雨真,乐巧,亚男,小之,如曼,山槐,谷蓝,笑容,香露,白薇,凝丝,雨筠,秋尽,婷冉,冰凡,亦云,芙蓉,天蓝,沉鱼,东蒽,飞丹,涵瑶,雁开,以松,南烟,傲霜,香旋,觅荷,幼珊,无色,凤灵,新竹,半莲,媚颜,紫雪,寒香,幼晴,宛菡,采珊,凝蕊,无颜,莫言,初兰,冷菱,妙旋,梨愁,友琴,水蓉,尔岚,怜蕾,怀蕾,惜天,谷南,雪兰,语柳,夏菡,巧凡,映雁,之双,梦芝,傲白,觅翠,如凡,傲蕾,傲旋,以柳,从寒,双双,无春,紫烟,飞凤,紫丝,思卉,初雪,向薇,落雁,凡英,海菡,白晴,映天,静白,雨旋,安卉,依柔,半兰,灵雁,雅蕊,初丹,寒云,念烟,代男,笑卉,曼云,飞莲,幻竹,晓绿,寄容,小翠,小霜,语薇,芷蕾,谷冬,血茗,天荷,问丝,沛凝,翠绿,寒松,思烟,雅寒,以南,碧蓉,绮南,白凡,安莲,访卉,元瑶,水风,凡松,友容,访蕊,若南,涵雁,雪一,怀寒,幻莲,碧菡,绿蕊,如雪,珊珊,念珍,莫英,朝雪,茹嫣,老太,曼易,宛亦,映寒,谷秋,诗槐,如之,水桃,又菱,迎夏,幻灵,初夏,晓槐,代柔,忆安,迎梅,夜云,傲安,雨琴,听芹,依玉,冬寒,绿柏,梦秋,千青,念桃,苑睐,夏蓉,诗蕾,友安,寻菱,绮烟,若枫,凝竹,听莲,依波,飞松,依秋,绿柳,元菱,念芹,如彤,香彤,涵梅,映容,平安,赛凤,书桃,梦松,以云,映易,小夏,元灵,天真,晓蕾,问玉,问薇,笑晴,亦瑶,半芹,幼萱,凡双,夜香,阑香,阑悦,溪灵,冥茗,丹妗,妙芹,飞飞,觅山,沛槐,太英,惋清,太清,灵安,觅珍,依风,若颜,觅露,问柳,以晴,山灵,晓兰,梦菡,思萱,半蕾,紫伊,山兰,初翠,岂愈,海雪,向雁,冬亦,柏柳,青枫,宝莹,宝川,若灵,冷梅,艳一,梦槐,依霜,凡之,忆彤,英姑,清炎,绮露,醉卉,念双,小凡,尔琴,冬卉,初柳,天玉,千愁,稚晴,怀曼,雪曼,雪枫,缘郡,雁梅,雅容,雁枫,灵寒,寻琴,慕儿,雅霜,含莲,曼香,慕山,书兰,凡波,又莲,沛春,语梦,青槐,新之,含海,觅波,嫣然,善愁,善若,善斓,千雁,白柏,雅柏,冬灵,平卉,不弱,不惜,灵槐,海露,白梦,尔蓉,芷珊,迎曼,问兰,又柔,雪青,傲之,绿兰,听兰,冰旋,白山,荧荧,迎荷,丹彤,海白,谷云,以菱,以珊,雪萍,千兰,大娘,思枫,白容,翠芙,寻雪,冰岚,新晴,绿蓉,傲珊,安筠,怀亦,安寒,青丝,灵枫,芷蕊,寻真,以山,菲音,寒烟,易云,夜山,映秋,唯雪,嫣娆,梦菲,凤凰,一寡,幻然,颜演,白翠,傲菡,妙松,忆南,醉蓝,碧彤,水之,怜菡,雅香,雅山,丹秋,盼晴,听双,冷亦,依萱,静槐,冰之,曼柔,夏云,凌寒,夜天,小小,如南,寻绿,诗翠,丹翠,从蕾,忆丹,傲薇,宛白,幻枫,晓旋,初瑶,如蓉,海瑶,代曼,靖荷,采枫,书白,凝阳,孤晴,如音,傲松,书雪,怜翠,雪柳,安容,以彤,翠琴,安萱,寄松,雨灵,新烟,妙菡,雪晴,友瑶,丹珍,白凝,孤萍,寒蕾,妖妖,藏花,葵阴,幻嫣,幻悲,若冰,藏鸟,又槐,夜阑,灭绝,藏今,凌柏,向雪,丹雪,无心,夜雪,幻桃,念瑶,白卉,飞绿,怀梦,幼菱,芸遥,芷波,灵波,一凤,尔蝶,问雁,一曲,问芙,涔雨,宫苴,尔云,秋凌,灵煌,寒梅,灵松,安柏,晓凡,冰颜,行云,觅儿,天菱,舞仙,念真,代亦,飞阳,迎天,摇伽,菲鹰,惜萍,安白,幻雪,友桃,飞烟,沛菡,水绿,天薇,依瑶,夏岚,晓筠,若烟,寄风,思雁,乐荷,雨南,乐蓉,易梦,凡儿,翠曼,静曼,魂幽,茹妖,香魔,幻姬,凝珍,怜容,惜芹,笑柳,太君,莫茗,忆秋,代荷,尔冬,山彤,盼雁,山晴,乐瑶,灵薇,盼易,听蓉,宛儿,从灵,如娆,南霜,元蝶,忆霜,冬云,访文,紫夏,新波,千萍,凤妖,水卉,靖儿,青烟,千琴,问凝,如冰,半梦,怀莲,傲芙,静蕾,艳血,绾绾,绝音,若血,若魔,虔纹,涟妖,雪冥,邪欢,冰姬,四娘,二娘,三娘,老姆,黎云,青旋,语蕊,代灵,紫山,傲丝,听寒,秋珊,代云,代双,晓蓝,茗茗,天蓉,南琴,寻芹,诗柳,冬莲,问萍,忆寒,尔珍,新梅,白曼,一一,安波,醉香,紫槐,傲易,冰菱,访曼,冷卉,乐儿,幼翠,孤兰,绮菱,觅夏,三颜,千风,碧灵,雨竹,平蓝,尔烟,冬菱,笑寒,冰露,诗筠,鸣凤,沛文,易文,绿凝,雁玉,梦曼,凌雪,怜晴,傲玉,幻儿,书萱,绮玉,诗霜,惜寒,惜梦,乐安,以蓝,之瑶,夏寒,丹亦,凌珍,问寒,访梦,新蕾,书文,平凡,如天,怀柔,语柔,宛丝,南蕾,迎海,代芹,巧曼,代秋,慕梅,幼蓉,亦寒,冬易,丹云,丹寒,丹蝶,代真,翠梅,翠风,翠柏,翠安,从霜,从露,初之,初柔,初露,初蝶,采萱,采蓝,采白,冰烟,冰彤,冰巧,傲云,凝冬,雁凡,书翠,千凡,半青,惜儿,曼凡,乐珍,新柔,翠萱,飞瑶,幻露,梦蕊,安露,晓露,白枫,怀薇,雁露,梦竹,盼柳,沛岚,夜南,香寒,山柏,雁易,静珊,雁蓉,千易,笑萍,从雪,书雁,曼雁,晓丝,念蕾,雅柔,采柳,易绿,向卉,惜文,冰兰,尔安,语芹,晓山,秋蝶,曼卉,凝梦,向南,念文,冰蓝,听南,慕凝,如容,亦凝,乐菱,怀蝶,惜筠,冬萱,初南,含桃,语风,白竹,夏瑶,雅绿,怜雪,从菡,访波,安青,觅柔,雅青,白亦,宛凝,安阳,苞络,不二,如花,安安,安吉,安静,安娜,安妮,安琪,安然,安娴,安祯,荌荌,奥婷,奥维,奥雅,北辰,北嘉,北晶,贝莉,贝丽,琲瓃,蓓蕾,碧琳,碧莹,冰冰,冰洁,冰心,冰彦,冰莹,博丽,博敏,博雅,布凡,布侬,布欣,布衣,偲偲,采莲,采薇,彩静,彩萱,彩妍,灿灿,婵娟,畅畅,畅然,唱月,朝旭,朝雨,琛丽,琛瑞,晨曦,晨旭,初然,楚楚,楚洁,楚云,春芳,春华,春娇,春兰,春岚,春梅,春桃,春晓,春雪,春燕,春英,春雨,淳静,淳美,淳雅,慈心,聪慧,聪睿,翠茵,黛娥,丹丹,丹红,丹溪,笛韵,典丽,典雅,蝶梦,丁辰,丁兰,冬梅,端静,端丽,端敏,端雅,端懿,多思,朵儿,婀娜,恩霈,尔雅,璠瑜,方方,方雅,方仪,芳蔼,芳春,芳芳,芳菲,芳馥,芳华,芳蕙,芳洁,芳林,芳苓,芳荃,芳蕤,芳润,芳馨,芳懿,芳茵,芳泽,芳洲,飞燕,菲菲,霏霏,斐斐,芬菲,芬芬,芬馥,丰熙,丰雅,馥芬,甘雨,甘泽,高洁,歌阑,歌云,歌韵,格菲,格格,葛菲,古兰,古香,古韵,谷雪,谷玉,瑰玮,桂帆,桂枫,桂华,桂月,桂芝,海儿,海女,含娇,含景,含文,含香,含秀,晗玥,涵涵,涵韵,菡梅,好洁,好慕,浩岚,浩丽,皓洁,皓月,合乐,合美,合瑞,和璧,和静,和美,和暖,和平,和悌,和煦,和暄,和雅,和怡,和玉,和豫,和悦,河灵,荷珠,荷紫,赫然,鹤梦,姮娥,弘丽,弘雅,弘懿,红豆,红旭,红叶,闳丽,虹星,虹英,虹颖,虹影,虹雨,虹玉,华采,华楚,华乐,华婉,华月,华芝,怀慕,怀思,怀玉,欢欣,欢悦,会雯,会欣,彗云,惠丽,惠美,惠然,惠心,慧婕,慧君,慧丽,慧美,慧心,慧秀,慧雅,慧艳,慧英,慧颖,慧语,慧月,慧云,蕙兰,蕙若,吉帆,吉玟,吉敏,吉欣,吉星,吉玉,吉月,季雅,霁芸,佳惠,佳美,佳思,佳文,佳妍,佳悦,家美,家欣,家馨,嘉宝,嘉惠,嘉丽,嘉美,嘉禾,嘉淑,嘉歆,嘉言,嘉怡,嘉懿,嘉音,嘉颖,嘉玉,嘉月,嘉悦,嘉云,江雪,姣姣,姣丽,姣妍,娇洁,娇然,皎洁,皎月,杰秀,洁静,洁雅,洁玉,今歌,今瑶,今雨,金玉,金枝,津童,锦凡,锦诗,锦文,锦欣,瑾瑶,菁菁,菁英,晶辉,晶晶,晶灵,晶滢,靓影,静安,静涵,静和,静慧,静美,静淑,静恬,静婉,静娴,静秀,静雅,静逸,静云,菊华,菊月,娟娟,娟丽,娟秀,娟妍,绢子,隽洁,隽美,隽巧,隽雅,君洁,君丽,君雅,筠溪,筠心,筠竹,俊慧,俊雅,珺俐,珺琦,珺琪,珺娅,可可,可儿,可佳,可嘉,可心,琨瑶,琨瑜,兰芳,兰蕙,兰梦,兰娜,兰若,兰英,兰月,兰泽,兰芝,岚翠,岚风,岚岚,蓝尹,朗丽,朗宁,朗然,乐然,乐容,乐心,乐欣,乐怡,乐悦,莉莉,丽芳,丽华,丽佳,丽姝,丽思,丽文,丽雅,丽玉,丽泽,丽珠,林帆,林楠,琳芳,琳怡,琳瑜,伶俐,伶伶,灵卉,灵慧,灵秀,灵雨,灵韵,玲琅,玲琳,玲玲,玲珑,玲然,凌春,凌晓,铃语,菱凡,菱华,令慧,令美,流惠,流丽,流如,流婉,流逸,柳思,珑玲,芦雪,罗绮,洛妃,洛灵,玛丽,麦冬,曼丽,曼蔓,曼妮,曼婉,曼吟,曼语,曼珠,嫚儿,蔓菁,蔓蔓,梅风,梅红,梅花,梅梅,梅青,梅雪,梅英,美偲,美华,美丽,美曼,美如,萌阳,蒙雨,孟乐,孟夏,孟阳,梦华,梦兰,梦丝,梦桐,梦影,梦雨,梦月,梦云,梦泽,米琪,米雪,密如,密思,淼淼,妙婧,妙思,妙颜,妙意,妙音,妙珍,玟丽,玟玉,珉瑶,闵雨,敏慧,敏丽,敏叡,敏思,名姝,明煦,明艳,鸣晨,鸣玉,茗雪,茉莉,木兰,牧歌,慕诗,慕思,慕悦,暮雨,暮芸,娜兰,娜娜,乃心,乃欣,囡囡,楠楠,妮娜,妮子,霓云,旎旎,念念,宁乐,凝洁,凝静,凝然,凝思,凝心,凝雪,凝雨,凝远,妞妞,浓绮,暖暖,暖姝,暖梦,盼盼,沛若,佩兰,佩杉,佩玉,佩珍,芃芃,彭丹,嫔然,品韵,平和,平惠,平乐,平良,平宁,平婉,平晓,平心,平雅,平莹,萍雅,萍韵,璞玉,齐敏,齐心,其雨,奇颖,颀秀,琦巧,琦珍,琪华,启颜,绮怀,绮丽,绮美,绮梦,绮思,绮文,绮艳,绮云,千叶,芊丽,芊芊,茜茜,倩丽,倩美,倩秀,倩语,俏丽,俏美,琴心,琴轩,琴雪,琴音,琴韵,卿月,卿云,清昶,清芬,清涵,清华,清晖,清霁,清嘉,清宁,清奇,清绮,清秋,清润,清淑,清舒,清婉,清心,清馨,清雅,清妍,清一,清漪,清怡,清逸,清懿,清莹,清悦,清韵,清卓,情文,情韵,晴波,晴虹,晴画,晴岚,晴丽,晴美,晴曦,晴霞,晴雪,琼芳,琼华,琼岚,琼诗,琼思,琼怡,琼音,琼英,秋芳,秋华,秋露,秋荣,秋彤,秋阳,秋英,秋颖,秋玉,秋月,秋芸,曲静,曲文,冉冉,苒苒,荏苒,任真,溶溶,蓉城,蓉蓉,融雪,柔怀,柔惠,柔洁,柔谨,柔静,柔丽,柔蔓,柔妙,柔淑,柔婉,柔煦,柔绚,柔雅,如心,如馨,如仪,如意,如云,茹薇,茹雪,茹云,濡霈,蕊珠,芮安,芮波,芮欢,芮佳,芮静,芮澜,芮丽,芮美,芮欣,芮雅,芮优,芮悦,瑞彩,瑞锦,瑞灵,瑞绣,瑞云,瑞芝,睿敏,睿思,睿彤,睿文,睿哲,睿姿,润丽,若芳,若华,若兰,若淑,若彤,若英,莎莉,莎莎,三春,三姗,三诗,森莉,森丽,沙羽,沙雨,杉月,姗姗,善芳,善和,善静,善思,韶华,韶丽,韶美,韶敏,韶容,韶阳,韶仪,邵美,沈靖,沈静,沈然,沈思,沈雅,诗怀,诗文,施然,施诗,世敏,世英,世韵,书慧,书仪,书艺,书意,书语,书云,抒怀,姝好,姝惠,姝丽,姝美,姝艳,淑华,淑惠,淑慧,淑静,淑兰,淑穆,淑然,淑婉,淑贤,淑雅,淑懿,淑哲,淑贞,舒畅,舒方,舒怀,舒兰,舒荣,舒扬,舒云,帅红,双文,双玉,水晶,水悦,水芸,顺慈,顺美,丝柳,丝萝,丝娜,丝琦,丝琪,丝祺,丝微,丝雨,司辰,司晨,思嫒,思宸,思聪,思迪,思恩,思凡,思涵,思慧,思佳,思嘉,思洁,思莲,思琳,思美,思萌,思敏,思娜,思楠,思琪,思若,思思,思彤,思溪,思雅,思怡,思义,思懿,思茵,思莹,思雨,思语,思云,斯琪,斯乔,斯斯,斯文,斯雅,松雪,松雨,松月,素华,素怀,素洁,素昕,素欣,棠华,洮洮,桃雨,陶宁,陶然,陶宜,天恩,天慧,天骄,天籁,天睿,天心,天欣,天音,天媛,天悦,天韵,田然,田田,恬畅,恬静,恬美,恬谧,恬默,恬然".split(",")

    const humanNameSecondForTwo = "彭,宓,英,天,未,伟,墁,荷,玙,妮,绢,弘,睿,子,清,鸿,树,宏,志,政,雨,修,新,书,凝,妙,梦,绿,灵,筠,静,幻,尔,白,蕊,明,曼,丽,元,星,万,湉,浩,广,芳,成,允,阳,赫,飞,桁,送,建,源,意,锐,敏,俊,谦,奇,嘉,羽,智,正,愚,咏,雅,乐,和,承,安,金,莹,瑞,兰,华,桂,映,忆,小,香,夏,水,若,如,念,冷,含,海,凡,道,初,冰,傲,蒙,令,厚,不,廷,体,之,梓,则,勃,紫,易,寻,学,向,思,任,代,自,芷,雪,琦,佩,南,觅,凌,丹,永,淑,越,良,才,十,行,廖,无,百,楷,臣,烽,燊,聪,一,冬,湘,玉,浦,凯,甘,德,翰,远,贺,世,情,琴,萍,品,涵,古,歌,笛,兴,鹏,宪,秋,暮,霁,亦,以,依,夜,听,舒,诗,茹,卿,绮,霓,黎,寄,慧,彗,寒,谷,孤,访,从,楚,乘,伯,淩,畅,诩,欣,芮,慕,阑,佳,欢,耕,瀚,晗,松,杉,菊,皎,吉,皓,唱,闭,致,心,石,龙,汩,博,蔚,埔,断,洲,桎,箴,珅,绍,其,转,烨,沧,岂,通,康,荆,健,慈,昭,彬,雁,问,双,璞,鸣,玟,洁,怀,虹,碧,泽,倩,铃,项,桃,丝,沙,闵,今,风,春,朝,涔,中,丰,翔,擎,开,校,贯,来,温,琳,琨,瑾,璠,强,裕,暖,淇,炙,沉,翊,语,泱,发,京,忘,冥,魂,总,瞿,民,濯,旭,靓,晶,平,宝,荧,菲,太,人,琼,莫,梅,菁,昊,豪,蓝,绝,觐,宇,翠,素,葵,细,端,勇,刚,流,炳,柱,巍,怛,义,亚,北,醉,友,青,千,盼,靖,旻,又,晓,宛,淳,余,士,经,朋,乃,啸,陶,韶,方,列,剑,布,艳,延,舆,红,贤,文,景,珉,芸,勰,作,举,妖,涟,凤,鹭,刘,笑,孟,萌,懋,牧,汝,可,昆,贝,山,落,姝,哲,炎,茂,纪,颜,果,时,三,启,媚,相,娟,姣,彩,玄,立,力,淄,怜,半,珺,祯,敬,斯,沈,柔,隽,君,季,典,奥,庭,忻,仇,惜,唯,融,晴,茗,米,芦,江,严,庄,幼,毓,连,忡,采,寿,懿,胜,荣,群,鹤,诚,彰,月,洪,晨,外,颀,杰,仲,宜,俨,劲,昂,衡,粤,日,定,蒋,家,锦,会,丁,齐,溥,惠,非,观,加,好,云,祺,徐,着,瞬,继,竹,超,序,治,亿,逸,舞,昌,迎,逢,八,峻,泉,庚,肇,登,晋,符,孺,聋,晞,光,虔,曲,沛,富,斌,炫,湛,瑰,剀,善,利,徽,绾,老,贵,津,支,熠,浚,淮,丛,惋,玖,烁,增,田,澹,满,浏,复,恶,栋,森,上,洮,奚,振,筱,波,帅,攀,俶,坜,澍,甸,偲,美,尉,渊,密,柳,桓,多,珥,招,珈,名,斐,叫,迪,术,宾,赞,滕,苏,施,全,难,长,庆,楼,桄,恩,潮,卫,鬼,泊,铁,跃,溪,珊,姗,林,柘,莎,萧,炯,粟,蕙,勋,琪,信,合,琛,翼,袭,巧,於,宣,扬,溶,蓉,芙,章,升,慎,罗,薛,嫣,荏,苒,胥,婷,冉,毅,恬,泰,嫔,玲,朗,娇,实,理,竟,舡,沐,稚,佑,训,牛,昕,鞘,叮,枳,磊,澎,岚,茜,芊,浓,煜,曾,游,纲,轩,润,舟,溢,后,穹,展,鑫,芃,濡,咚,付,妞,愉,藏,四,二,毒,大,益,旎,坤,楠,璐,柯,盛,灭,囡,娜,婀,起,卓,追,然,血,柏,步,稀,楗,渤,孔,淼,彧,蝶,僮,盈,顺,邵,俏,菡,腊,蔓,誉,汛,苞,点,乔,稼,玺,珑,洛,河,伶,峥,本,帆,传,与,袁,弈,绣,茉,莉,忠,玛,闳,高,傀,蓓,艾,杪,琲,宁,恺,木,苑,记,耀,斗,祉,旋,曦,科,泳,用,简,舂,译,维,缘,枚,壮,赛,聿,婵,汉,宫,沁,祥,圣,虎,浙,化,宸,援,军,育,佟,滔,砖,运,同,蕴,必,彦,沄,曙,羿,晰,禹,计,邪,抒,绎,孝,宽,留,矜,棠,菱,羞,东,童,恪,眙,轲,恭,迩,祎,居,责,熙,汇,匡,克,铸,周,城,滨,珍,纬,在,尚,深,详,蜀,宵,格,踏,达,有,摇,芬,寡,焱,渺,房,客,福,馥,霏,葛,湃,励,召,嫚,朵,姮,黛,仁,奎,莜,麦,裔,岐,基,拥,前,濮,旖,言,常,梨,楦,榛,仔,火,怡,帧,坚,官,司,警,甲,勤,辽,檀,楣,灿,罕,圳,豫,泓,眧,晟,巳,先,生,丞,真,当,殊,荌".split(",")


    const humanNameSecondForThree = "祖,纵,宗,字,紫,梓,子,资,姿,濯,卓,壮,专,祝,竹,珠,洲,周,州,舟,仲,终,忠,中,智,致,郅,志,知,枝,芝,之,政,正,征,争,震,振,阵,圳,臻,榛,祯,真,珍,贞,喆,哲,诏,兆,昭,招,钊,长,漳,彰,章,湛,展,斩,旃,增,泽,藻,赞,在,载,蕴,韵,运,允,芸,云,粤,越,跃,悦,玥,月,怨,远,源,塬,缘,媛,袁,沅,员,元,渊,燠,豫,誉,煜,愈,裕,喻,谕,昱,育,郁,玉,语,禹,雨,羽,宇,屿,与,愚,榆,瑜,愉,逾,渔,雩,禺,鱼,余,佑,有,友,游,由,尤,幽,优,用,涌,勇,泳,咏,永,庸,映,应,影,颖,滢,莹,荧,迎,鹰,缨,英,尹,吟,音,荫,茵,阴,因,懿,翼,熠,毅,意,逸,谊,益,羿,奕,轶,驿,怿,峄,易,译,亦,忆,艺,义,乙,宜,怡,仪,漪,依,衣,伊,一,烨,晔,叶,业,耀,曜,瑶,遥,谣,垚,尧,妖,洋,阳,扬,央,燕,谳,焱,雁,晏,艳,彦,演,衍,俨,颜,炎,岩,妍,言,严,延,嫣,烟,娅,亚,雅,汛,循,珣,旬,勋,血,雪,学,绚,炫,泫,选,旋,玄,煊,暄,萱,宣,轩,煦,蓄,絮,续,旭,许,绣,秀,修,休,雄,杏,兴,醒,星,信,鑫,馨,歆,新,欣,昕,忻,心,斜,邪,协,啸,笑,晓,小,霄,萧,消,肖,翔,祥,镶,骧,湘,香,献,现,显,娴,贤,纤,先,仙,夏,霞,侠,禧,喜,玺,曦,羲,熙,溪,晰,惜,析,希,汐,晤,悟,武,午,五,汶,问,雯,纹,文,蔚,尉,位,卫,玮,纬,苇,伟,维,沩,为,韦,薇,微,威,危,望,旺,万,绾,婉,图,头,潼,童,桐,彤,佟,同,通,挺,婷,庭,亭,廷,恬,田,天,悌,滕,腾,桃,洮,滔,焘,涛,棠,堂,泰,钛,太,邃,肃,颂,菘,松,嗣,偲,斯,思,丝,硕,朔,铄,烁,顺,水,爽,霜,双,栓,澍,树,舒,淑,殊,姝,抒,书,兽,寿,适,仕,实,识,时,石,施,诗,盛,胜,圣,声,生,升,神,燊,深,珅,身,涉,劭,少,韶,尚,赡,善,珊,姗,杉,山,厦,莎,森,瑟,色,三,飒,箬,弱,若,润,叡,睿,瑞,锐,蕊,蕤,洳,儒,如,柔,融,溶,蓉,容,绒,荣,日,忍,仁,人,娆,壤,穰,苒,冉,然,群,泉,荃,全,曲,秋,邱,穹,磬,庆,晴,清,卿,青,沁,勤,琴,芹,侵,钦,惬,巧,桥,荞,乔,强,茜,乾,褰,芊,洽,气,绮,起,祺,琦,琪,颀,奇,岐,芪,齐,魄,破,萍,评,平,品,频,澎,鹏,棚,彭,朋,芃,霈,佩,裴,培,盼,潘,湃,鸥,女,诺,暖,侬,妞,凝,柠,宁,鸟,娘,念,年,旎,倪,妮,能,楠,南,男,囡,娜,纳,穆,慕,沐,木,姆,眸,默,墨,漠,魔,命,溟,冥,茗,鸣,明,名,敏,旻,玟,民,妙,邈,渺,淼,冕,谧,梦,朦,檬,萌,美,梅,懋,茂,毛,漫,蔓,曼,迈,略,绿,珞,络,萝,纶,伦,鸾,露,路,禄,录,鲁,芦,珑,龙,柳,岭,淩,羚,棂,菱,凌,玲,苓,灵,伶,凛,麟,霖,嶙,粼,琳,林,量,亮,梁,良,练,廉,联,涟,莲,连,莉,俐,沥,利,丽,立,力,澧,理,礼,儡,蕾,磊,垒,耒,瓃,雷,乐,朗,琅,郎,斓,澜,蓝,阑,岚,兰,籁,睐,铼,来,阔,鲲,锟,鹍,琨,坤,魁,馗,旷,邝,宽,空,恪,可,棵,科,康,慨,恺,凯,开,珺,骏,浚,峻,郡,俊,筠,钧,君,军,绝,娟,聚,举,驹,居,苴,玖,静,靖,婧,景,鲸,精,晶,旌,菁,京,晋,妗,进,尽,谨,锦,津,金,今,婕,捷,桀,洁,杰,教,觉,骄,姣,娇,江,键,舰,健,剑,建,见,骞,简,兼,坚,甲,嘉,家,佳,骥,霁,济,计,藉,极,吉,基,姬,火,活,蕙,慧,惠,汇,卉,悔,回,徽,辉,晖,珲,挥,煌,凰,焕,寰,欢,槐,怀,桦,画,化,骅,华,花,琥,虎,厚,侯,鸿,洪,虹,泓,宏,闳,红,弘,恒,黑,鹤,赫,翮,荷,河,和,禾,灏,颢,皓,淏,浩,昊,号,好,豪,航,行,瀚,翰,菡,涆,汉,罕,寒,涵,晗,含,海,果,国,囯,贵,鬼,广,光,鹳,冠,贯,寡,姑,功,工,耕,亘,根,格,歌,杲,高,皋,罡,纲,刚,淦,干,伽,馥,富,赋,复,妇,甫,福,芙,夫,凤,逢,冯,锋,烽,峰,峯,封,枫,风,丰,奋,芬,斐,霏,菲,非,妃,飞,放,舫,昉,访,钫,芳,方,范,凡,帆,发,二,儿,蒽,恩,恶,娥,渡,毒,豆,斗,栋,动,咚,冬,东,锭,定,顶,丁,蝶,铫,典,缔,地,笛,涤,敌,迪,德,道,刀,荡,宕,澹,丹,代,大,达,存,翠,摧,爨,聪,枞,赐,慈,春,闯,传,川,楚,初,筹,愁,畴,仇,翀,冲,翅,驰,池,澄,程,城,承,诚,呈,成,谌,晨,宸,忱,沉,辰,尘,臣,琛,郴,掣,潮,朝,超,唱,畅,昶,昌,侪,曾,岑,策,册,藏,苍,灿,彩,采,财,材,才,渤,博,勃,伯,波,炳,秉,兵,冰,镔,滨,斌,彬,玢,飇,飙,彪,标,变,扁,璧,壁,弼,本,焙,贝,北,悲,豹,保,宝,薄,帮,邦,败,柏,百,白,坝,拔,八,澳,奥,翱,昂,荌,安,嫒,艾,蔼".split(",")


    const humanNameThirdForThree = "彭,宓,英,天,未,伟,墁,荷,玙,妮,绢,弘,睿,子,清,鸿,树,宏,志,政,雨,修,新,书,凝,妙,梦,绿,灵,筠,静,幻,尔,白,蕊,明,曼,丽,元,星,万,湉,浩,广,芳,成,允,阳,赫,飞,桁,送,建,源,意,锐,敏,俊,谦,奇,嘉,羽,智,正,愚,咏,雅,乐,和,承,安,金,莹,瑞,兰,华,桂,映,忆,小,香,夏,水,若,如,念,冷,含,海,凡,道,初,冰,傲,蒙,令,厚,不,廷,体,之,梓,则,勃,紫,易,寻,学,向,思,任,代,自,芷,雪,琦,佩,南,觅,凌,丹,永,淑,越,良,才,十,行,廖,无,百,楷,臣,烽,燊,聪,一,冬,湘,玉,浦,凯,甘,德,翰,远,贺,世,情,琴,萍,品,涵,古,歌,笛,兴,鹏,宪,秋,暮,霁,亦,以,依,夜,听,舒,诗,茹,卿,绮,霓,黎,寄,慧,彗,寒,谷,孤,访,从,楚,乘,伯,淩,畅,诩,欣,芮,慕,阑,佳,欢,耕,瀚,晗,松,杉,菊,皎,吉,皓,唱,闭,致,心,石,龙,汩,博,蔚,埔,断,洲,桎,箴,珅,绍,其,转,烨,沧,岂,通,康,荆,健,慈,昭,彬,雁,问,双,璞,鸣,玟,洁,怀,虹,碧,泽,倩,铃,项,桃,丝,沙,闵,今,风,春,朝,涔,中,丰,翔,擎,开,校,贯,来,温,琳,琨,瑾,璠,强,裕,暖,淇,炙,沉,翊,语,泱,发,京,忘,冥,魂,总,瞿,民,濯,旭,靓,晶,平,宝,荧,菲,太,人,琼,莫,梅,菁,昊,豪,蓝,绝,觐,宇,翠,素,葵,细,端,勇,刚,流,炳,柱,巍,怛,义,亚,北,醉,友,青,千,盼,靖,旻,又,晓,宛,淳,余,士,经,朋,乃,啸,陶,韶,方,列,剑,布,艳,延,舆,红,贤,文,景,珉,芸,勰,作,举,妖,涟,凤,鹭,刘,笑,孟,萌,懋,牧,汝,可,昆,贝,山,落,姝,哲,炎,茂,纪,颜,果,时,三,启,媚,相,娟,姣,彩,玄,立,力,淄,怜,半,珺,祯,敬,斯,沈,柔,隽,君,季,典,奥,庭,忻,仇,惜,唯,融,晴,茗,米,芦,江,严,庄,幼,毓,连,忡,采,寿,懿,胜,荣,群,鹤,诚,彰,月,洪,晨,外,颀,杰,仲,宜,俨,劲,昂,衡,粤,日,定,蒋,家,锦,会,丁,齐,溥,惠,非,观,加,好,云,祺,徐,着,瞬,继,竹,超,序,治,亿,逸,舞,昌,迎,逢,八,峻,泉,庚,肇,登,晋,符,孺,聋,晞,光,虔,曲,沛,富,斌,炫,湛,瑰,剀,善,利,徽,绾,老,贵,津,支,熠,浚,淮,丛,惋,玖,烁,增,田,澹,满,浏,复,恶,栋,森,上,洮,奚,振,筱,波,帅,攀,俶,坜,澍,甸,偲,美,尉,渊,密,柳,桓,多,珥,招,珈,名,斐,叫,迪,术,宾,赞,滕,苏,施,全,难,长,庆,楼,桄,恩,潮,卫,鬼,泊,铁,跃,溪,珊,姗,林,柘,莎,萧,炯,粟,蕙,勋,琪,信,合,琛,翼,袭,巧,於,宣,扬,溶,蓉,芙,章,升,慎,罗,薛,嫣,荏,苒,胥,婷,冉,毅,恬,泰,嫔,玲,朗,娇,实,理,竟,舡,沐,稚,佑,训,牛,昕,鞘,叮,枳,磊,澎,岚,茜,芊,浓,煜,曾,游,纲,轩,润,舟,溢,后,穹,展,鑫,芃,濡,咚,付,妞,愉,藏,四,二,毒,大,益,旎,坤,楠,璐,柯,盛,灭,囡,娜,婀,起,卓,追,然,血,柏,步,稀,楗,渤,孔,淼,彧,蝶,僮,盈,顺,邵,俏,菡,腊,蔓,誉,汛,苞,点,乔,稼,玺,珑,洛,河,伶,峥,本,帆,传,与,袁,弈,绣,茉,莉,忠,玛,闳,高,傀,蓓,艾,杪,琲,宁,恺,木,苑,记,耀,斗,祉,旋,曦,科,泳,用,简,舂,译,维,缘,枚,壮,赛,聿,婵,汉,宫,沁,祥,圣,虎,浙,化,宸,援,军,育,佟,滔,砖,运,同,蕴,必,彦,沄,曙,羿,晰,禹,计,邪,抒,绎,孝,宽,留,矜,棠,菱,羞,东,童,恪,眙,轲,恭,迩,祎,居,责,熙,汇,匡,克,铸,周,城,滨,珍,纬,在,尚,深,详,蜀,宵,格,踏,达,有,摇,芬,寡,焱,渺,房,客,福,馥,霏,葛,湃,励,召,嫚,朵,姮,黛,仁,奎,莜,麦,裔,岐,基,拥,前,濮,旖,言,常,梨,楦,榛,仔,火,怡,帧,坚,官,司,警,甲,勤,辽,檀,楣,灿,罕,圳,豫,泓,眧,晟,巳,先,生,丞,真,当,殊,荌,祖".split(",")


    const twoOrThree = Math.random();

    var randomName = '';

    if (twoOrThree > 0.97) {
      var a = Math.floor(Math.pow(Math.random(), 3) * humanNameFirst.length + 1) - 1;
      var b = Math.floor(Math.pow(Math.random(), 1.1) * humanNameDoubleForThree.length + 1) - 1;
      randomName = humanNameFirst[a] + humanNameDoubleForThree[b];
    }
    else if (twoOrThree > 0.6) {
      var m = Math.floor(Math.pow(Math.random(), 3) * humanNameFirst.length + 1) - 1;
      var n = Math.floor(Math.pow(Math.random(), 1.5) * humanNameSecondForTwo.length + 1) - 1;
      randomName = humanNameFirst[m] + humanNameSecondForTwo[n];
    }
    else {
      var x = Math.floor(Math.pow(Math.random(), 3) * humanNameFirst.length + 1) - 1;
      var y = Math.floor(Math.pow(Math.random(), 1.5) * humanNameSecondForThree.length + 1) - 1;
      var z = Math.floor(Math.pow(Math.random(), 1.5) * humanNameThirdForThree.length + 1) - 1;
      randomName = humanNameFirst[x] + humanNameSecondForThree[y] + humanNameThirdForThree[z];
    }
    return randomName;
  }
}

module.exports = utils