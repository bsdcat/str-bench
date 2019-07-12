/*
 *  Copyright 2019 Google LLC
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

var multipliers;
var benchmarks_loaded = false;

function load_benchmarks()
{
  var xhr = new XMLHttpRequest();
  var url = "strength_bench.json";
  xhr.open("GET", url, true);

  xhr.onreadystatechange = function ()
  {
    if (xhr.readyState==4 && xhr.status==200) {
      multipliers = JSON.parse(xhr.responseText);
      benchmarks_loaded = true;
      calculate();
    }
  }
  xhr.send();
}

function calculate()
{
  var weight = parseInt(document.getElementById("weight_input").value);
  if (isNaN(weight) || benchmarks_loaded == false) {
    return;
  }
  var level_select = document.getElementById("level_input");
  var level = level_select.options[level_select.selectedIndex].value;
  var gender_select = document.getElementById("gender_input");
  var gender = gender_select.options[gender_select.selectedIndex].value;

  for (let [exercise, calc] of Object.entries(multipliers[level][gender])) {
    if (calc["type"] == "raw") {
      document.getElementById(exercise).innerHTML = calc["value"];
    } else if (calc["type"] == "mult") {
      var raw_weight = Math.trunc(weight * calc["value"]);
      var rounded_weight = raw_weight - (raw_weight % 5);
      document.getElementById(exercise).innerHTML = rounded_weight;
    }
  }
}

document.addEventListener("DOMContentLoaded", load_benchmarks);
