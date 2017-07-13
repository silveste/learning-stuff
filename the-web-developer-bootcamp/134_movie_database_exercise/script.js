var data = [
  {
    watched: true,
    title: "In Bruges",
    rate: 5
  },
  {
    watched: false,
    title: "Frozen",
    rate: 4.5
  },
  {
    watched: false,
    title: "Mad Max Fury Road",
    rate: 5
  },
  {
    watched: false, title: "Les Miserables",
    rate: 3.5
  }
]

data.forEach(function(each){
  if (each.watched){
    console.log(" You have watched " + each.title + " - " + each.rate + " stars")
  } else {
    console.log(" You have not seen " + each.title + " - " + each.rate + " stars")
  }
});
