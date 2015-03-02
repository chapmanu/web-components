$(function () {

    //NOTE: this script is used only for the main listing page /our-faculty/index.aspx NOT for the school/dept specific listing pages. They use faculty.js.
    var devUrl = "//chapmanfaculty.dev.breilabs.com",
        prodUrl = "//" + window.location.hostname,
        page = 0,
        resultsPerPage = 20,
        totalPages = 0,
        scope = "_faculty/all",
        schoolFilter = "",
        departmentFilter = "",
        keywords = "",
        facultyFeedUrl = function () {
            return prodUrl + "/" +
                   scope + "/" +
                   (keywords ? keywords + "/" : "") +
                   page + "/" +
                   resultsPerPage + "?" +
                   (schoolFilter ? ("school=" + schoolFilter + "&") : '') +
                   (departmentFilter ? ("dept=" + departmentFilter + "&") : '') +
                   "callback=?";
        },
        applyUserInput = function () {

            // A little bit of session storage to rememeber form state
            if (window.sessionStorage) {
                var directorySearchBox = document.getElementById("directorySearchBox"),
                    collegeFilterSelect = document.getElementById("collegeFilter"),
                    departmentFilterSelect = document.getElementById("departmentFilter");

                // Search Box
                if (sessionStorage.keywords) {
                    directorySearchBox.value = sessionStorage.keywords;
                }
                directorySearchBox.onkeyup = function (e) {
                    sessionStorage.keywords = this.value;
                }

                // All faculty checkbox session storage handled in onclick function

                // College Filter

                if (sessionStorage.collegeFilter && !$("#allFaculty:checked").length) {
                    collegeFilterSelect.value = sessionStorage.collegeFilter;
                }
                $(collegeFilterSelect).bind("change", function () {
                    sessionStorage.collegeFilter = collegeFilterSelect.value;
                });

                // Department Filter
                if (sessionStorage.departmentFilter && !$("#allFaculty:checked").length) {
                    departmentFilterSelect.value = sessionStorage.departmentFilter;
                }
                $(departmentFilterSelect).bind("change", function () {
                    sessionStorage.departmentFilter = departmentFilterSelect.value;
                });
            }

            var allFaculty = $("#allFaculty:checked").length,
                searchString = $("#directorySearchBox").val();

            schoolFilter = $("#collegeFilter option:selected").val();
            departmentFilter = $("#departmentFilter option:selected").val();

            if ($("#allFaculty:checked").length) {
                schoolFilter = '';
                departmentFilter = '';
            }

            if (!(searchString)) {
                allFaculty = true;
            }

            if (allFaculty) {
                scope = "_faculty/all";
                keywords = '';
            }
            else {
                scope = "_search";
                keywords = $.trim(searchString);
            }
        },
        populateResults = function () {
            $.getJSON(facultyFeedUrl(), function (data) {
                globalData = data;
                for (var i = 0; i < data.length; i++) {
                    var v_photo;
    				if (!data[i].ThumbnailPhoto) {
						v_photo = '/_files/level/img/unisex-silhouette.jpg';
					}
					else if (data[i].ThumbnailPhoto == '/') {
						v_photo = '/_files/level/img/unisex-silhouette.jpg';
					}
					else if (data[i].ThumbnailPhoto == '') {
						v_photo = '/_files/level/img/unisex-silhouette.jpg';
					}
					else {
						v_photo = data[i].ThumbnailPhoto;
					}
                    var result = {
                        link: data[i].CascadePath ? '/our-faculty/' + data[i].CascadePath : '',
                        image: v_photo,
                        name: $.trim(data[i].FacFullName),
                        title: data[i].Rank,
                        additionalTitles: data[i].AdditionalTitles,
                        affiliation: (function () {
                            var affiliation = [];
                            for (var j = 0; j < (data[i].Depts.length); j++) {
                                //affiliation.push(data[i].Depts[j].SchoolName);
                                var schl;
                                if (data[i].DeanFlag == 'Y') {
                                    schl = data[i].Depts[j].SchoolName + ', Dean';
                                }
                                else {
                                    schl = data[i].Depts[j].SchoolName;
                                }
                                affiliation.push(schl) ;
                                var dept;
                                if (data[i].Depts[j].DisplayDeptName != 'Conservatory of Music') {
                                    dept = data[i].Depts[j].DisplayDeptName ? (data[i].Depts[j].DisplayDeptName) : '';
                                }
                                else {
                                    dept = '';
                                }
                                var deptFacGrp;
                                if (dept != '') {
                                    deptFacGrp = data[i].Depts[j].FacGroupName ? (dept + ', ' + data[i].Depts[j].FacGroupName) : dept;
                                }
                                else {
                                    deptFacGrp = deptFacGrp = data[i].Depts[j].FacGroupName ? (data[i].Depts[j].FacGroupName) : '';;
                                }
                                affiliation.push(deptFacGrp);
                                //affiliation.push((data[i].Depts[j].DisplayDeptName ? (data[i].Depts[j].DisplayDeptName) : '') +
                                //                ((data[i].Depts[j].DisplayDeptName && data[i].Depts[j].FacGroupName) ? (', ' + data[i].Depts[j].FacGroupName) : ''));
                            }
                            return affiliation.join("<br>");
                        })(),
                        phone: data[i].OfficePhone,
                        email: data[i].ChapEmail
                    }

                    $(".searchResults .pagingInfo").before(formatResult(result));
                }
                var rangeLower = data[data.length - 1] ? ((data[data.length - 1].CurrentPage * resultsPerPage) + 1) : 0,
                    rangeUpper = data[data.length - 1] ? ((data[data.length - 1].CurrentPage + 1) * data[data.length - 1].ResultsPerPage) : 0,
                    totalResults = data[data.length - 1] ? (data[data.length - 1].TotalResults) : 0;

                if (rangeUpper > totalResults) {
                    rangeUpper = totalResults;
                }

                $(".rangeLower").html(rangeLower);
                $(".rangeUpper").html(rangeUpper);
                $(".totalResults").html(totalResults);
                totalPages = data[data.length - 1] ? (data[data.length - 1].TotalPages) : 0;

                $(".searchResults .result.old").remove();
            });
        };

    applyUserInput();
    populateResults();

    $(".directorySearchButton").click(function (event) {
        applyUserInput();

        $(".searchResults .result").addClass("old");
        page = 0;
        populateResults();
    });

    $('#directorySearchBox').keypress(function (event) {

        if (event.which == 13) {
            jQuery(this).blur();
            jQuery('.directorySearchButton').focus().click();
        }
    });

    $("#allFaculty").click(function () {
        if ($("#allFaculty:checked").length) {
            //$("select").val($('options:first').val());
            $("#directorySearchBox, #collegeFilter, #departmentFilter").attr("disabled", "disabled");
        }
        else{            
            $("#directorySearchBox, #collegeFilter, #departmentFilter").removeAttr("disabled");
        }

        if (window.sessionStorage) {
            sessionStorage.allFaculty = $("#allFaculty:checked").length;
        }
    });


    $(".first").click(function () {
        page = 0;
        $(".searchResults .result").addClass("old");
        populateResults();
    });

    $(".previous").click(function () {
        (page === 0) ? page = 0 : page -= 1;
        $(".searchResults .result").addClass("old");
        populateResults();
    });

    $(".next").click(function () {
        (page === totalPages) ? page = totalPages : page += 1;
        $(".searchResults .result").addClass("old");
        populateResults();
    });

    $(".last").click(function () {
        page = totalPages;
        $(".searchResults .result").addClass("old");
        populateResults();
    });

    function formatResult(result) {

        var formattedResult =
            '<div class="result" itemscope itemtype="http://schema.org/Person">' +
                (result.link ? '<a class="link" href="' + result.link + '" itemprop="url">VIEW PROFILE</a>' : '') +
                (result.image ? '<div class="profilePicture"><img class="image" width="80px" src="' + result.image + '" itemprop="image"></div>' : '') +
                (result.name ? '<div class="name" itemprop="name">' + result.name + '</div>' : '') +
                (result.title ? '<div class="title" itemprop="jobTitle">' + result.title + '</div>' : '') +
                (result.additionalTitles ? '<div class="additionalTitles" itemprop="jobTitle">' + result.additionalTitles + '</div>' : '') +
                (result.affiliation ? '<div class="affiliation" itemprop="affiliation">' + result.affiliation + '</div>' : '') +
        //(result.phone ? '<div class="phone" itemprop="telephone">' + result.phone + '</div>' : '') +
                (result.email ? '<a class="email" href="mailto:' + result.email + '" itemprop="email">' + result.email + '</a>' : '') +
            '</div>';

        return formattedResult;
    }

});