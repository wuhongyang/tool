var Ktv = Ktv || {};

// C++返回的信息
Ktv.imConst = {
    loginBackMsg: {
        LOGON_SUCCESS: 						1,	// 登陆成功 						
        LOGON_INVALID_UIN: 					2,	// 非法用户id 						
        LOGON_WRONG_PASSWD: 				3,	// 用户密码错误 					
        LOGON_WRONG_ROOM_PASSWD: 			4,	// 错误的房间密码 				
        LOGON_NO_THIS_ROOM: 					5,	// 登陆的房间不存在 					
        LOGON_ROOM_IS_FULL: 					6,	// 房间人数已经满了 					
        LOGON_ROOM_IS_CLOSED: 				7,	// 房间被关闭					
        LOGON_ALREADY_IN_ROOM: 				8,	// 已经在房间 					
        LOGON_ROOM_IS_BUSY: 					9,	// 房间忙 					
        LOGIN_NO_ROOM_MEMBER: 				10,	// 系统繁忙 					
        LOGON_ROOM_IS_FREEZED: 				11,	// 房间被冻结 					
        LOGON_ROOM_IS_DELETED: 				12,	// 登录的房间已经删除 					
        LOGON_AUTHUSER_TIMEOUT: 				13,	// 验证用户超时 				
        LOGON_ROOM_KNOCKING: 					14,	// 需要敲门 					
        LOGON_SYSTEM_IS_BUSY: 					15,	// 系统繁忙，当登陆时，soap网关返回-1时，不能说房间忙，否则引起误会 					
        LOGON_ROOM_IS_FORCEOUT_IP: 				16,	// 是被封杀的IP 				
        LOGON_ROOM_IS_FORCEOUT_IP_FOREVER: 		17,	// 是被永久封杀的 		
        LOGON_ROOM_IS_FORCEOUT_PC: 			18,	// 是被封杀机器码的 				
        LOGON_ROOM_IS_FORCEOUT_PC_FOREVER: 		19,	// 是被永久封杀机器码的 		
        LOGON_LOGIN_TOO_MANY_UIN_EACH_IP: 		20,	// 一个IP登陆次数过多 			
        LOGON_TOO_FREQUENTLY: 				21,	// 登陆太频繁 					
        LOGON_LOGIN_TOO_MANY_UIN_EACH_MAC: 		22,	// 一个机器码登录次数过 		
        LOGON_LOGIN_HIDE_FAIL: 					23 	// 隐身登陆失败					

    },

    userRghtFlag: {
        USER_FLAG_OWNER     : 0x00000001,   //房间主人(管理员)
        USER_FLAG_MANAGER   : 0x00000020,   //管理员,权利等同房间主人，仅不能更改房间所有者
        USER_FLAG_EMCEE     : 0x00000002,   //主持人
        USER_FLAG_MIKE      : 0x00000004,   //麦克持有者
        USER_FLAG_MEMBER    : 0x00000008,   //是否会员

        USER_FLAG_ROOT      : 0x00000010,   //是否超级用户
        USER_FLAG_SUPERADMIN :0x00000010,   //超管
        
        USER_FLAG_CAMERA    : 0x00000100,   //是否有摄像头
        //USER_FLAG_HIDE        : 0x00000200,   //隐身
        USER_FLAG_MIKE_SEQ  : 0x00000400,   //麦序持有者

    //  USER_FLAG_SINGER     : 0x00001000,  //歌手
    //  USER_FLAG_MIKE_JUDGE : 0x00002000,  //评委
    //  USER_FLAG_SINGER_TEMP: 0x00004000,  //歌手
    //  USER_FLAG_MIKE_JUDGE_TEMP: 0x00008000,//裁判
    //  USER_FLAG_MIKE_ZHUCHI_TEMP : 0x00010000,//主持
        
        //VIP
        USER_FLAG_VIP_LEVEL1 : 0x00020000,//VIP1
        USER_FLAG_VIP_LEVEL2 : 0x00040000,//VIP2
        USER_FLAG_VIP_LEVEL3 : 0x00080000,//VIP3
        //MONEY LEVE
        USER_FLAG_MONEY_LEVEL1:0x00100000,
        USER_FLAG_MONEY_LEVEL2:0x00200000,
        USER_FLAG_MONEY_LEVEL3:0x00400000,
        USER_FLAG_MONEY_LEVEL4:0x00800000,
        USER_FLAG_MONEY_LEVEL5:0x01000000,
        USER_FLAG_MONEY_LEVEL6:0x02000000,
        USER_FLAG_MONEY_LEVEL7:0x04000000,
        USER_FLAG_CONTRACT_SINGER:0x08000000,
        USER_FLAG_AGENT      :0x10000000,
        USER_FLAG_MAIN_ROOM_MANAGER:0x20000000,
        USER_FLAG_VIP_LEVEL4    : 0x40000000,
        USER_FLAG_VIP_LEVEL5    : 0x80000000,
        USER_FLAG_STAR_SINGER : 0x00004000,     //明星艺人
        USER_FLAG_DEPUTY_OWN : 0x00010000,      //副室主
        USER_FLAG_VIP_LEVEL6 : 0x00008000,      //新vip

        USER_FLAG_EXPENSE_FIRST     : 0x00000040,  // 消费排名第一 什么爵位 64
        USER_FLAG_EXPENSE_SECOND    : 0x00000080,  // 。。。。。二 。。。。 128
        USER_FLAG_EXPENSE_THIRD     : 0x00000200,  // 。。。。。三 。。。。 512
        USER_FLAG_EXPENSE_FOURTH    : 0x00000800,  // 。。。。。四 。。。。 2048
        USER_FLAG_EXPENSE_FIFTH     : 0x00001000,  // 。。。。。五 。。。。 4096
        USER_FLAG_EXPENSE_SIXTH     : 0x00002000  // 。。。。。六 。。。。 8192

    },

    operateType: [
        'OPERATE_TYPE_FORBID_CHAT',
        'OPERATE_TYPE_KICK_USER',
        'OPERATE_TYPE_FORCE_OUT',
        //'OPERATE_TYPE_FORCE_OUT_IP',
        'OPERATE_TYPE_SEND_BACK_MIKE',
        //'OPERATE_TYPE_SEND_MIKE_TO',
        'OPERATE_TYPE_RELEASE_KICK_USER',
        'OPERATE_TYPE_STOP_SONG',
        'OPERATE_TYPE_TOP_SONG',
        'OPERATE_TYPE_DELETE_SONG',
        'OPERATE_TYPE_CONTROL_SONG_LIST',
        'OPERATE_TYPE_UPDATE_ROOM_INFO',
        'OPERATE_TYPE_OPEN_CLOSE_ROOM' ,
        'OPERATE_TYPE_ADD_DELETE_MANAGER' ,
        'OPERATE_TYPE_ROOM_MANAGER_BUTTON' ,
        'OPERATE_TYPE_ENTER_FULL_ROOM' ,
        'OPERATE_TYPE_ENTER_SHOW_SPECIAL_EFFICACY' ,
        'OPERATE_TYPE_ENTER_SHOW_MESSAGE' ,
        'OPERATE_TYPE_NOBLE_ONLY_STAMP' ,
        'OPERATE_TYPE_SEND_PRIVATE_MIKE_TO' ,
        'OPERATE_TYPE_CONNECT_PRIVATE_MIKE' ,
        'OPERATE_TYPE_BIAOQING_FIRST' ,
        'OPERATE_TYPE_BIAOQING_SECOND' ,
        'OPERATE_TYPE_BIAOQING_THIRD' ,
        'OPERATE_TYPE_BIAOQING_FOURTH' ,
        'OPERATE_TYPE_BIAOQING_FIFTH' ,
        'OPERATE_TYPE_BIAOQING_SIXTH' ,
        'OPERATE_TYPE_BIAOQING_SEVENTH' ,
        'OPERATE_TYPE_BIAOQING_EIGHTH' ,
        'OPERATE_TYPE_LOOK_OVER_IP' ,
        'OPERATE_TYPE_CHAT_FLOWER_LIMIT_LOW' ,
        'OPERATE_TYPE_CHAT_FLOWER_LIMIT_HIGH' ,
        'OPERATE_TYPE_TEMPORARY_NOTICE' ,
        'OPERATE_TYPE_LEAVE_SHOW_MESSAGE' ,
        'OPERATE_TYPE_FREEZE_ROOM' ,
        'OPERATE_TYPE_TAKE_BACK_PRIVATE_MIKE' ,
        'OPERATE_TYPE_ADD_FRIEND' ,
        'OPERATE_TYPE_PRIVATE_CHAT' ,
        'OPERATE_TYPE_ENTER_SHOW_PRIVATE_MESSAGE' ,
        'OPERATE_TYPE_FREE_BROADCAST' ,
        'OPERATE_TYPE_SEND_SONG' ,
        'OPERATE_TYPE_MANAGE_GOLDMIKE' ,
        'OPERATE_TYPE_PRIVATE_SEND_GIFT' ,
        'OPERATE_TETE_USE_CHECK_GIFT_FIRST' ,
        'OPERATE_TETE_USE_CHECK_GIFT_SECOND' ,
        'OPERATE_TETE_ADD_OR_DEL_DEPUTY_OMNER' ,
        'OPERATE_TETE_USE_MUTE_PRIVATE_CHAT' ,
        'OPERATE_TYPE_ENTER_CLOSED_ROOM' ,
        'OPERATE_TYPE_GRAB_MIKE' ,
        'OPERATE_TYPE_ENTER_ANY_ROOM' ,
        'OPERATE_TYPE_TALK_IN_FORBIDPUBTALK_ROOM' ,
        'OPERATE_TYPE_KTV_STATE_HIDE' ,
        'OPERATE_TYPE_CANCEL_PRIMIKE_SEQ' ,
        'OPERATE_TYPE_MUTE_FLOWER' ,
        'OPERATE_TYPE_MUTE_USERCHAT' ,
        'OPERATE_TYPE_USERCHAT_LIMIT' ,
        'OPERATE_TYPE_USE_KEEPMIKEUSER' ,
        'OPERATE_TYPE_USE_SHOWGOODS_TYPE' ,
        'OPERATE_ENTER_MANAGERLIST' ,
        'OPERATE_CHANGE_MIKEMODE' ,
        'OPERATE_ADD_TEMPMANAGER' ,
        'OPERATE_TYPE_RCV_VOLDOLL_GOOD' ,
        'OPERATE_TYPE_LOCKMIKE' ,
        'OPERATE_TYPE_SHOW_INVISIBLE' 
    ],
    
    //其他业务服务 20000-30000,都是有业务系统自己通过SetServerInfo接口更新
    serverManager: {
        SERVER_KTV_SERVICE:      20001,       //ktv服务标志 例如kkyoo.com,用于登陆流媒体判别
        SERVER_KTV_MEDIASVR:     20002,       //ktv流媒体服务器地址
        SERVER_KTV_SONGSVR:      20003,       //ktv点歌台服务
        SERVER_KTV_MANAGESVR:    20004,       //ktv房间管理地址
        SERVER_KTV_SYSVR:        20005,       //ktv系统信息服务地址
        SERVER_KTV_GETSONG:      20006,       //ktv更新歌曲信息
        SERVER_GAME_SERVER_ADDR: 20007,       //游戏服务器页面地址，页面里面的参数带上了 游戏的 ip 与端口
        SERVER_GAME_MAIN_FLASH_ADDR: 20008,   //游戏的载体flash 所在页面地址
        SERVER_GAME_SERVER_ADDR_EX: 20011,
        SERVER_GAME_MAIN_FLASH_ADDR_EX: 20012,
        SERVER_FAMILY_PIC:       20013,       //家族图标地址
        SERVER_FAMILY_URL:       20014,       //家族操作（升级家族、家族面板等）的Url
        SERVER_LOGINTIME_URL:    20015,       //登录时间记录的url
        SERVER_EXCHANGE_URL:     20016,       //兑换的页面地址
        SERVER_IMAGE_UPFILE:     20017       //图片上传地址
    },

    // 礼物信息
    giftInfo: {
        CMD_SEND_GIFT: 1
    }
};
