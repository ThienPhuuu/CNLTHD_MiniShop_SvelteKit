import type { Product } from '$lib/types';

export const products: Product[] = [
	{
		id: 'p1',
		name: 'Ly gốm mộc vuốt tay mộc mạc',
		category: 'Gốm thủ công',
		categoryId: 'gom',
		price: 240000,
		description:
			'Chế tác từ đất phù sa sông Hồng, nung củi nhiệt cao mang lại bề mặt men đốm độc bản không trùng lặp.',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuBYzXTnuwmbZSB2_V4TEeoaqQKl3OXPuK3USOYMzC1m-MC7KN9KWhN-Z339BOKQaeKaUGzDRvwAoimAC2PA8PX1JWcPfnLhCwtwVpmdtBke9csU7Zudc3PMAUOt8yzYd6n2kk-hAcmO6fHrrH2UYr5Q6JOarB4fa_poYzxCdGacPKiFwkk9S7wifqT0xnzu7kXJqXWcWE5tQz-7rT6K1zUkSQJ4BAMA_0IxJduOzbMiU8uXUiTK2xbK',
		artisan: 'Xưởng Bát Tràng',
		origin: 'GỐM MEN THÔ BÁT TRÀNG · TÁC PHẨM ĐỘC BẢN',
		material: 'Đất sét sông Hồng & men tro củi tự nhiên',
		size: 'Đường kính 8.2cm · Chiều cao 7.5cm · Dung tích 220ml',
		detail:
			'Được tạo hình thủ công bởi người thợ gốm làng Bát Tràng qua 7 công đoạn vuốt tay và nung củi nhiệt cao suốt 18 giờ. Lớp men tro tự nhiên hòa cùng sắc khoáng đất sông Hồng tạo nên bề mặt nhám nhẹ, mang lại cảm giác tĩnh tại và đầm tay mỗi khi nâng chén trà sớm.',
		stock: 12,
		oldPrice: 280000,
		gallery: [
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDtMYhPdjyWLaAonPnTRrh-GRuWttY1PtB09XRwi6LdeiYjOzpskEuKNxpXJ0_4dyEQavyGEzyw21hqg8vcnudCNB6IFTKHCz5nSaxP3hH4rGy_eNE8PHllMaqC1dPVHpHQ_tLPbsbGunRBLqn-GKoRS4Xb3Re03mtXucvftdBpRcO8JgW0BHfF8O38boyeWQf_QtIwt98kXtzuDIhPUIuCPC0v4LiNYKrSpO_jrgkhO24TtqWck_Ol',
			'https://lh3.googleusercontent.com/aida-public/AB6AXuCzg64TIlRzvI2livyMYtxID-0g0la9YygixK1QelTv1bcYcKFJdnGisoNf4A-UCQBbIHQsg_uMD5NJehS04PsWRL05EsPd1SGfmcMdRQk1-u2xs1HQY_LhkSH9tka5cbk-CkmmOduPlxftUuwhSVZ2w4LHLV2oDzk6OUuAwXpvmZWX-dvsWxzylxL240jNWurk_iniltU6jz8viLT827b1TKEFrmoP2TR_BhzZbyPTKpy6SconJYA2',
			'https://lh3.googleusercontent.com/aida-public/AB6AXuBYq7dk41qkwKSBtzmobahaPi180YAPXheK2dpJ8Ry1ho0xB7ywJPHpIyCXjuEeAp6dSP0BXQW0WxlYBPc96ZPN5leBeEAyW0dAoeOTlFslN5qU-k-mp0cZelO1KlTwHiEk3F0TBzRPaeAD1ZlE2ppgd8p_oJizRVHXJRMiP113Ra0mDccmyD72Py2uVzmmbfS7Cpt3qpgMYINnHaQX9ozqcsdBa1LwTMH8SvuBcQeUH1zxWm6gDqUg',
			'https://lh3.googleusercontent.com/aida-public/AB6AXuB0wdIANTAtshiZYVxxQRjn9V5DB1Il8-AMZLHpSgnhhDala5SsoK6EjuGR9YG4uj_dKRqGO_3qDGuXThJNLlFPQ_wVF2-e5YAftc3VVAb76w7Bt0WosZpLT0jMtEkYMyRll1zTqfbMxPzJiFj0J0ovlp0X7rxmaERyn75Som9YO3UFj9YsmfHCtcxX8A7lgh0Izm8BmGrbQLSx6U1FESe8uPyxT3cDH0XAsLDaFSO-BjUTvAG9cVc0'
		]
	},
	{
		id: 'p2',
		name: 'Khay gỗ tần bì để bàn tự nhiên',
		category: 'Gỗ & Mây',
		categoryId: 'go',
		price: 380000,
		description:
			'Gỗ nguyên khối được bào tay tỉ mỉ, phủ dầu lau thực vật an toàn cho đồ ăn và cốc chén hàng ngày.',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuBDA6ey551T82PFVlDtEYjA4XqSTcajUPAk8J0NqhK4ZZhldVbkxi7Oq_fB9BL9oiqAPJzWxy2sywSlK3irAf8Z9-pbHHcY9Pow_lSVerv5BrWYCx8i_4Qi2OFPGgDl8bZ06d87Id0eVyH8YK2QnK9DETrJwobz-PSXbLA-jlaNCGH_VVaAXEKeQDI4-4P7IOqYBk7KqlRwqGKhcn7ekuyPdrLf8bItmc0jPiGKFnYhacJVW4v9pirP',
		artisan: 'Xưởng mộc Thạch Thất',
		origin: 'XƯỞNG MỘC THẠCH THẤT · GỖ TỰ NHIÊN',
		material: 'Gỗ tần bì nguyên khối (Solid Ash), dầu lau an toàn thực phẩm',
		size: 'Dài 28cm · Rộng 18cm · Dày 2cm',
		detail:
			'Từng thớ gỗ tần bì Bắc Mỹ nguyên khối được tuyển chọn kỹ lưỡng, bào tay mộc và bo cong cạnh êm ái. Bề mặt quét phủ 3 lớp dầu thực vật gốc hạt lanh an toàn, giữ nguyên sắc gỗ sáng ấm và mùi hương mộc mạc.',
		stock: 8
	},
	{
		id: 'p3',
		name: 'Sổ tay giấy bồi đóng gáy chỉ thô',
		category: 'Giấy & Mực',
		categoryId: 'giay',
		price: 165000,
		description:
			'Giấy bồi dẻo dai bám mực tuyệt vời, khâu tay theo phương pháp gáy hở truyền thống dễ mở 180 độ.',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuA_EG6wMcW77oSMnwJmGhK3o24Z0Ssfwo-KMGd7Z08jaBbezg8EidMKU0XB2-t0LCGpIsxypZPYG8vjWoy7Tg4Z4lFXFfmghg602OrvvOcxVDwForKJI0fPiU1vy1AitMtHk0sUdlul9TnsbXwniV_8iIXgIHTuUDi2CBTq-DlKWzQi-j-GZBQ8FYMGw8HgOi7kQTfkZddnj-g7KQZF5Fo8GgJhS00Xvz_pQqMGKtQMa9pSabSEhyZE',
		artisan: 'Xưởng Dó Yên Thái',
		origin: 'LÀNG DÓ YÊN THÁI · KHÂU CHỈ THỦ CÔNG',
		material: 'Giấy bồi vỏ cây dó truyền thống 140gsm, chỉ gai tự nhiên',
		size: 'Khổ A5 (14.8 x 21cm) · 128 trang mộc mạc',
		detail:
			'Cuốn sổ giữ trọn nếp giấy bồi thủ công truyền thống với mép giấy xơ tơ tự nhiên. Gáy hở được thắt chỉ gai mộc mạc cho phép mở phẳng tuyệt đối 180 độ, êm dịu nâng niu từng nét bút mực và trang ký họa.',
		stock: 24
	},
	{
		id: 'p4',
		name: 'Lọ nến thơm sáp cọ hương trầm & trà',
		category: 'Hương thơm',
		categoryId: 'huong',
		price: 320000,
		description:
			'Tinh dầu tự nhiên chiết xuất trầm hương rừng và lá trà xanh non, bấc gỗ tí tách êm dịu khi cháy.',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDY_nG8ziH4_x4JrrGShP6oV-lDOUK3J2Pye_-ebg-m4ip0v7dpQTH-5VtzQtgns1aBUzgMYg6UEX7ahxUpr4K0nvVsudCVSmc7pFOAC70n2yLnBktmZwKS9OTOY7Jrxjtb-7xo9I1j8WAQMataH_gg1yI9MSm0YAN206askx-_ICxAmDjr6fmKhvlnO5F5F-p5r1vbaPOPskOmUxgT24sZBA0r7vSsuUafhRTUlKUglzzuKB3pXk26',
		artisan: 'Mùi của mộc.',
		origin: 'MÙI CỦA MỘC · THẢO MỘC NGUYÊN BẢN',
		material: '100% sáp cọ thực vật nguyên chất, tinh dầu tự nhiên, bấc gỗ',
		size: 'Trọng lượng 200g sáp · Thời gian cháy ~45 giờ',
		detail:
			'Sự giao hòa giữa vị ấm nồng của trầm hương rừng già và hương thanh mát sâu lắng của búp trà non. Đổ tay trong hũ gốm đất nung, bấc gỗ thiên nhiên reo tí tách êm dịu khi tỏa hương.',
		stock: 15
	},
	{
		id: 'p5',
		name: 'Bình hoa gốm đất nung terracotta',
		category: 'Gốm thủ công',
		categoryId: 'gom',
		price: 450000,
		description:
			'Dáng bình thắt eo cổ điển, bề mặt thô nhám giữ trọn vẹn sắc đỏ ấm của đất sét tự nhiên nung già.',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuCFaXFrJInuhBr9sUum-UV073PkHOdGMQPVvGdRoXp9gDLm0AhpMfkx7jKhtwaNN6l5dq2DZ3VDr0pCNjna2F-wADP07ZEkT5Kji_pKc-GSYYPR-Jxp6ZVCEdhyB6zGBaPUN_inluOXzAEnhZl00Gf4jyjkN1HwQ9l5jlPZWyAAFLfazocX6P-aoHjQDuIBSNXvdN-JYtZS4GBDId3Twad1AEFOi8RuN0tfArzzvV8yDMPKKZv9Yigs',
		artisan: 'Xưởng Hội An',
		origin: 'XƯỞNG GỐM HỘI AN · THỦ CÔNG ĐẤT NUNG',
		material: 'Đất sét đỏ Hội An nung già ở 1.100°C',
		size: 'Chiều cao 19cm · Bụng bình 13cm · Miệng 6cm',
		detail:
			'Dáng thắt eo mộc mạc lấy cảm hứng từ chum vại cổ ven sông Thu Bồn. Đất nung đỏ ấm, giữ được độ xốp tự nhiên giúp cành khô hay hoa dại luôn toát lên vẻ an nhiên, tĩnh tại.',
		stock: 6
	},
	{
		id: 'p6',
		name: 'Chặn giấy đá cuội mài thủ công',
		category: 'Đồ dùng bàn',
		categoryId: 'go',
		price: 190000,
		description:
			'Thu nhặt từ suối nguồn Tây Bắc, mài bóng mờ bằng sáp ong tự nhiên, giữ trọn nếp vân trầm mặc.',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuDjQ_9DEgiEm81b-fCwy9h8CfBbIkYQEm01kIRDCNuolSlEtt56wcTDpDRrrMICkRugw67Im9YZQFenjSio8I71NrFumo4bmBVQVx8U3Yq202mZuWp9c1gqSbbeqwDBEX5J5p8mp1-FJCKsp3wyNl1gG0aj40V6cTC1iOHNmTgcscIVcg9qbyo9KihTwejR8X43_MO23HxpMqPtmyH46jFS38BS9FYIH2ZnvzjCjAqxuWULY32CxvyX',
		artisan: 'Mộc Bản Sưu Tầm',
		origin: 'MỘC BẢN SƯU TẦM · TỰ NHIÊN TÂY BẮC',
		material: 'Đá cuội suối tự nhiên phủ sáp ong rừng',
		size: 'Dài ~10-12cm · Nặng ~400-550g',
		detail:
			'Từng viên đá cuội suối nguyên bản qua hàng ngàn năm bào mòn bởi dòng nước mát, được nghệ nhân mài bóng mờ bằng sáp ong tự nhiên, giữ trọn nếp vân trầm mặc và sức nặng tĩnh tại.',
		stock: 18
	},
	{
		id: 'p7',
		name: 'Muỗng gỗ mun nhẵn mịn',
		category: 'Gỗ & Mây',
		categoryId: 'go',
		price: 95000,
		description:
			'Chế tác từ gỗ mun cành tự rụng, vân sọc đen tuyền quý phái, dùng để pha trà mạn và cà phê phin.',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuCAOIyxVOIak809cjSeHc4BwyIgxo492yqcZz2AtjKMkqcbiK7jkJ94c2nCktpJIcFjVcdgfyvhnLHDg4m6-HVI6a7UQ1TWWakyNwU7II16MN6t9-kBEPs8h02DMSu57n37f_UazF5Au4u7sH6vdDflLatXTdKoeGfOQz0gIsMrnRiwFaoNwLArKw_WL3YTOWa0hPUxeBjlT8cJ3GBE_vwSm13pdSzD5aZ39xGR0_ykOs_2ErokrvMl',
		artisan: 'Xưởng mộc Thạch Thất',
		origin: 'XƯỞNG MỘC THẠCH THẤT · GỖ MUN QUÝ',
		material: 'Gỗ mun sừng tự nhiên nguyên khối',
		size: 'Dài 16.5cm · Lòng muỗng 3cm',
		detail:
			'Chế tác từ nhánh mun tự nhiên sẫm màu, đẽo gọt thanh mảnh và đánh bóng thủ công với bột lá chuối khô. Thích hợp múc trà khô, định lượng cà phê hạt hoặc thưởng thức mật ong.',
		stock: 30
	},
	{
		id: 'p8',
		name: 'Bộ bưu thiếp in khắc gỗ mộc',
		category: 'Giấy & Mực',
		categoryId: 'giay',
		price: 120000,
		description:
			'Bộ 6 tấm bưu thiếp in bằng ván khắc gỗ thị, mực điệp lấp lánh nhẹ nhàng gửi gắm lời chúc chân thành.',
		image:
			'https://lh3.googleusercontent.com/aida-public/AB6AXuAKBLDU6LRVUHm2BAnhpXYhX5RRmgWFgZAMXsSk3pMI0Emq5yjSgI-mFC0V38KWVOcSZ3zglt43BguGiu_ARMgmuEIAiPF6zvE_UVQy7kwkkpXknF0KRGjAoTTUHL6BDhSn6MPswRH0WQBfCQw1eY60S0USuTR0lMDD1ETlgW-QV-wcXLIY_JnbnMfOE5B_XVMo9A5cSQBx4HmgbhI6g0GlPpRCmoPcObHvXqyw5b9-gwZLjRklqbmi',
		artisan: 'Xưởng in Đông Hồ',
		origin: 'XƯỞNG IN ĐÔNG HỒ · KHẮC BẢN GỖ THỊ',
		material: 'Giấy điệp thủ công, ván khắc gỗ thị, mực tự nhiên',
		size: 'Khổ 10.5 x 15cm (Bộ 6 tấm kèm phong bì mộc)',
		detail:
			'Bộ 6 bưu thiếp in thủ công bằng bản khắc gỗ thị truyền thống, sử dụng màu điệp óng ánh từ vỏ sò biển quét lên nền giấy mộc mạc. Mỗi tấm là một lời chúc thanh nhã gửi trao.',
		stock: 21
	}
];
