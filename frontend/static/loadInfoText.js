function loadInfoText() {
  const title = $("title").text().split("|")[0].replace(" ", "");
  $("#pageTitle").text(title);
  const before = $("#pageDescriptionBefore");
  const after = $("#pageDescriptionAfter");
  const location = window.location.pathname;

  $.get("/descriptions/descriptions.json", function (data) {
    data.forEach((element) => {
      if (element["route"] == location) {
        console.log("Comments to self: " + element["comments_to_self"]);
        before.text(element["description"]);
        after.text(element["description_post_map"]);
        return;
      }
    });
  });
}
