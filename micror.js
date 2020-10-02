

var $router = {
	go(val, hash={hash:true}){
		if(hash.hash){
			window.location.hash = val;
		}else{
		//	window.history.pushState("",document.title, val);
			window.location.href = val;

		}

	},
	run( $func, others = null){
		if(typeof $router_config =='undefined'){
			let urll = window.location.href;
			$router_config = function(data){
				let _url = window.location.href;

				if( $router.getParams( _url ).length ==0 ){
					let val = window.location.hash;
					if( val.indexOf("?")){
						val = val.split("?")[0];
					}
				//	vv('111')
					$func( val, null, others );
				}else{
				
					let params =  $router.getParams( _url );
				//	vv( params, 'params getParams3' )
					let val = window.location.hash;
					if( val.indexOf("?")){
						val = val.split("?")[0];
					}
				//	vv('222')
					$func( val, params, others );
				}
				
			};
			/*
			window.addEventListener('load',function(data){

				if( $router.getParams( urll ).length ==0 ){
					$func( window.location.hash, null, others );
				vv( $router.getParams( urll ) ,'getParams1.2');

				}else{
					let params = $router.getParams( urll );

					$func( window.location.hash, params, others );
				}
				vv( $router.getParams( urll ) ,'getParams1');


			//  vv(window.location.hash,'load login.php')
			});
			*/


		//	$(document).ready(()=>{

			if( this.getParams( urll ).length ==0 ){
				let val = window.location.hash;
				if( val.indexOf("?")){
					val = val.split("?")[0];
				}

				$func( val, null, others );

			}else{
				let val = window.location.hash;
				if( val.indexOf("?")){
					val = val.split("?")[0];
				}

				let params = this.getParams( urll );
			//	vv( params, 'params getParams4' )	

				$func( val, params, others );
			}
			
		//	});
		//	vv( this.getParams( urll ) ,'getParams2');

			window.addEventListener('hashchange', $router_config);
		}
	},
	getParams(url = window.location.href ){
		
		let arr = [];
		if(url.indexOf('?')!=-1){
			var ary = url.split('?')[1].split('&');
			let ax={};
		//	vv(ary,'ary');
			let va = ary[0].split('=');
		//	vv(va,'va');

			$for((v)=>{
				let u = v.split('=');
				ax[u[0]] = u[1];
			},ary);
	/*
			for(let v in ary){
				let u = v.split('=');
				ax[u[0]] = u[1];
			}
	*/
			return ax;
		
		}
		return arr;
	},
	close(){
		window.removeEventListener('hashchange',  $router_config);
		delete window['$router_config'];

	}


}
