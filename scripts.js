function searchFlickr(f, e) {
  e.preventDefault();
	var flickr_api_url = 'https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?';
	var searchTag = $('#searchTag').val();

	$.getJSON(flickr_api_url,{
		tags: searchTag,
		tagmode: 'any',
		format: 'json'
	}).done(function(data){
		console.log(data);
		$.each(data.items, function(index,item){ //atfirs index is 0, item is
			console.log(item);
			item.tags=searchTag;
			$('<img class="'+item.tags+'">').attr('src',item.media.m).appendTo('#flickrDiv'); //append images top #flickrDiv
			$('#flickrDiv img').draggable({revert: true});

			$('.'+searchTag+'').droppable({ //make droppable only the area that has class searchTag 
				accept: "#flickrDiv img", //allows only images from #flickrDiv			
				drop:function( event, ui )//if the element is on the area
				  {
				  		if($(ui.draggable).hasClass(searchTag)){
				  			$(this).append(ui.draggable);
				  		}
					  
				  }
				});


			if(index == 4){
				return false;
			}
		});
	}).fail(function(){
		alert('Failed!');
	});

	$('<div>').attr('class',searchTag).appendTo('#baskets');

	$('#reset').click(function(){ 
		$('#searchTag').val(null);
  		$('#flickrDiv').html('');
  		$('#baskets').html('');
	})
};