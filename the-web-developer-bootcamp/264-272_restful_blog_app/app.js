/*DEV SECTION*/
var faker = require('faker');
function fakeArticle (){
  return {
    title: faker.lorem.words(),
    body: faker.lorem.paragraphs(),
  };
}
/*END DEV SECTION*/

/*FRAMEWORKS-LIBRARIES*/
var
express = require('express'),
bodyParser = require('body-parser'),
methodOverride = require('method-override'),
mongoose = require('mongoose'),
app = express();
/*END FRAMEWORKS-LIBRARIES*/

/*CONFIG*/
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));
mongoose.connect('mongodb://localhost/restful_blog_app');
/*END CONFIG*/

var articleSchema = new mongoose.Schema({
    title: String,
    image: { type: String, default: 'http://placeholder.pics/svg/400x400/10FF10-DCFFFD'},
    body: String,
    created: {type: Date, default: Date.now}
});
var Article = mongoose.model('Article', articleSchema);

/*DEV TEST*/
//Creating a minimum of 10 items in the DB
Article.find({}, function(err, articles){
  if(err){
    console.log(err);
    return -1;
  } else {
    console.log("Setting articles to a minimum of 10 for testing puposes");
    console.log("Initial articles:" + articles.length);
    for (var i = articles.length; i < 10; i++) {
      Article.create(fakeArticle(), function (err, article){
        if(err){
          console.log(err);
        } else {
          console.log("New article created");
          console.log(article);
        }
      });
    }
  }
});


/*END DEV TEST*/

/*RESTFUL ROUTES*/
app.get('/articles', function(req, res){
    Article.find({}, function(err, articles){
        if(err){
            console.log(err);
        }else{
            res.render('index', {articles: articles});
        }
    });
});

app.post("/articles", function(req,res){
  Article.create(req.body.article, function(err, newArtc){
    if(err){
      res.render("new");
    }else{
      res.redirect("/articles");
    }
  });
});
app.get("/articles/new", function(req, res){
  res.render("new");
});
app.get("/articles/:id", function(req, res){
  Article.findById(req.params.id, function(err, foundArticle){
    if(err){
      res.redirect("/articles");
    }else{
      res.render("show", {article: foundArticle});
    }
  });
});
app.get("/articles/:id/edit", function(req, res){
  Article.findById(req.params.id, function(err, foundArticle){
    if(err){
      res.redirect("/articles");
    }else{
      res.render("edit", {article: foundArticle});
    }
  });
});
app.put("/articles/:id", function(req,res){
  Article.findByIdAndUpdate(req.params.id, req.body.article, function(err, updatedBlog){
    if(err){
      res.redirect("/articles");
    }else{
      res.redirect("/articles/" + req.params.id);
    }
  });
});
app.delete("/articles/:id",function(req, res){
  Article.findByIdAndRemove(req.params.id, function(err){
    if(err){
      res.redirect("/articles/:id");
    }else{
      res.redirect("/articles");
    }
  });
});
app.get("/", function(req, res){
  res.redirect("/articles");
});
/*END RESTFUL ROUTES*/

/*LISTENER*/
app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Node is running on http://' + process.env.C9_HOSTNAME );
});
/*END LISTENER*/
