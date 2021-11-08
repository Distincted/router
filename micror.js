var $router = {
	go(val, hash={hash:true}){
		if(hash.hash){
			window.location.hash = val;
		}else{
			window.location.href = val;
		}
	},
	run( $func, others = null){
		if(typeof $router_config =='undefined'){
			let urll = window.location.href;
			$router_config = function( param2 ){
				let _url = window.location.href;
				if( $router.getParams( _url ).length ==0 ){
					let val = window.location.hash;
					if( val.indexOf("?")){
						val = val.split("?")[0];
					}
					$func( val, null, param2 );
				}else{
					let params =  $router.getParams( _url );
					let val = window.location.hash;
					if( val.indexOf("?")){
						val = val.split("?")[0];
					}
					$func( val, params, param2 );
				}
			};
			$router_config();
			window.addEventListener('hashchange', $router_config);
		}
	},
	getParams(url = window.location.href ){
		
		let arr = [];
		if(url.indexOf('?')!=-1){
			var ary = url.split('?')[1].split('&');
			let ax={};
			let va = ary[0].split('=');
			$for(function(v){
				let u = v.split('=');
				ax[u[0]] = u[1];
			},ary);
			return ax;
		}
		return arr;
	},
	reload( args){
		$router_config(args);
	},
	close(){
		if(typeof $router_config =='undefined'){
			return;
		}
		window.removeEventListener('hashchange',  $router_config);
		delete window['$router_config'];
	}
}
