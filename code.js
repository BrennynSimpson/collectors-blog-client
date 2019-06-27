
var app = new Vue ({
    el: "#app",

    data: {
        greeting: "A Collector's blog",
        page: "blog",
        drawer: false,
        categories: [
            "All",
            "Clothing",
            "Hunting",
            "Books",
            "Cards",
            "Coins",
            "Keychains",
            "Comic Books",
            "Misc."
        ],
        selected_category: "All",
        new_post_title: "",
        new_post_author: "",
        new_post_category: "",
        new_post_image: "",
        new_post_text: "",
        url: "http://localhost:3000",
        posts: []

    },
    
    created: function( ) {
        this.loadPosts();
    },

    methods: {
        loadPosts: function () {
            fetch( `${ this.url }/posts` ).then( function ( response ){
                response.json(  ).then( function ( data ) {
                    app.posts = data.posts;
                });
            });
        },
        createNewPost: function ( ) {
            var new_post = {
                title: this.new_post_title,
                author: this.new_post_author,
                category: this.new_post_category,
                date: new Date( ),
                image: this.new_post_image,
                text: this.new_post_text,
            };
            this.posts.unshift( new_post );
            this.new_post_title = "";
            this.new_post_author = "";
            this.new_post_category = "";
            this.new_post_image = "";
            this.new_post_text = "";
            this.page = "blog";
            addNewPost();
        },

        addNewPost: function ( ) {
			console.log( "Adding new post" );
			var req_body = {
				title: this.new_post_title,
                author: this.new_post_author,
                category: this.new_post_category,
                date: new Date( ),
                image: this.new_post_image,
                text: this.new_post_text,
			}
			fetch ( `${ this.url }/posts`, {
				method: "POST",
				headers: {
					"Content-type": "application/json"
				},
				body: JSON.stringify( req_body)
			}).then ( function ( response ) {
				
            });
            this.new_post_title = "";
            this.new_post_author = "";
            this.new_post_category = "";
            this.new_post_image = "";
            this.new_post_text = "";
            this.page = "blog";
        },

        formatDate: function ( post ) {
            var date = new Date(post.date);
            return date.getDate( ) + "/" + date.getMonth( )+ "/" + date.getFullYear( );
        },

        selectCategory: function ( category ) {
            this.selected_category = category;
            this.drawer = false;
        },
    },

    computed: {
        sorted_posts: function ( ) {
            if( this.selected_category == "All"){
                return this.posts;
            } else {
                var sorted_posts = this.posts.filter( function(post) {
                    return post.category == app.selected_category;
                });
                return sorted_posts;
            }
        }
    },
})

