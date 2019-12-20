---
layout: default
---

# Table of contents

`TODO: add the links when all parts are fixed`

<ul class="toc">
    <li class="li-bold">
        <a href="#overview"><span class="title">Overview</span></a>
        <span class="chapter"></span>
    </li>
    <li class="li-bold">
        <a href="#"><span class="title">Social status and product consumption</span></a>
        <span class="chapter">A</span>
    </li>
    <li>
        <a href="#"><span class="title right">?</span></a>
        <span class="chapter">A.?</span>
    </li>
    <li class="li-bold">
        <a href="#"><span class="title">Healthiness of food</span></a>
        <span class="chapter">B</span>
    </li>
    <li>
        <a href="#"><span class="title right">What's in our food?</span></a>
        <span class="chapter">B.1</span>
    </li>
    <li>
        <a href="#"><span class="title right">How relevant is the nutritive grade?</span></a>
        <span class="chapter">B.2</span>
    </li>
    <li class="li-bold">
        <a href="#"><span class="title">Impact of social status on nutritive health</span></a>
        <span class="chapter">C</span>
    </li>
    <li>
        <a href="#"><span class="title right">?</span></a>
        <span class="chapter">C.?</span>
    </li>
</ul>

# Overview

Imagine you are a young data scientist, working at the DLAB and Bob West enters your office without warning and shouts "we got two datasets related to food consumption ! do your work !" and slams the door.
You just woke up from your so you open your laptop, and start reading about these datasets and then you ask yourself :

	- What defines one household's social status?
	- What are the popular key components of our healthiness?
	- Is there a correlation between food consumption and social status?
	- ...what's on BC cafeteria's menu? (looking at food datasets made you hungry...)

But most importantly, this young data scientist is on verge of having answers to these questions. In fact, this data story will unveil the many analysis and discoveries from our data scientist, through these two datasets (Dunnhummby, and Open Food Facts Databases).
Welcome to a typical day of a DLAB scientist...     

**Side note:** all our plots are dynamic, feel free to interact with them! It is recommended to use a modern browser on a non-mobile device.

# Social status and product consumption

<div id="income-sales"></div>

<div id="purchases-income"></div>

<div id="purchases-age"></div>

<div id="purchases-marital"></div>

# Healthiness of food

What is our food made of? How is unhealthy food characterized? Are there any food categories more likely to be unhealthy?

Those are the questions we asked ourselves. To answer them we analyzed data from the [Open Food Facts](https://openfoodfacts.org) database, where we aggregated hundred of thousands of products.

## What's in our food?

Product labeling plays an important in informing the client about what they are about to consume. All countries have a regulation regarding food labeling, some are more less transparent than others.

Here we were interested in the ingredient list of the products. The information is given as a (usually) unquantified and unordered list of base ingredients. As we will see further on, it is not an absolute measure of healthiness.

<div id="top-ingredients"></div>

As one could expect the three top ingredients are salt, sugar and water. About 15% of products contain citric acid, a compound that can be found in lemon and vinegar but that is also used for food flavoring.

<div id="correlation-ingredients"></div>

What are the combinations of these ingredients? The above plot represents the [phi coefficient](https://en.wikipedia.org/wiki/Phi_coefficient) between each pair of ingredients, a statistical measure of association between two binary variables. For instance, it seems that garlic often comes with other spices, vinegar often combined with food flavoring, and corn syrup with additional sugar. On the other hand salt is less likely to be included with sugar or ascorbic acid. 

Finally, it turns out we can actually characterize food products by only looking at their ingredients. Below you may find the _map of food_, a spatial representation of products by their similarity in terms of ingredients. Use the query field to highlight products by their name: `chocolate`, `soda`, `fruit`, `cheese`, ...

<div style="text-align: center; margin-top: 20px">
<form action="#" id="query-form" style="display: inline-block">
  Keyword query: <input type="text" name="query" id="query-text" value="ice cream">
  <input type="submit" value="Highlight">
</form>
</div>
<div id="products-ingredients"></div>

This visualization shows us that names of the products are highly correlated with what they are made of. However correlation isn't causality, don't judge a book by its cover! It also highlights marketing strategies used by corporations to trigger positive emotions on the consumer; one of them is by using buzzwords such as `deluxe`, `mix` and `homestyle`.

<div id="correlation-sugars-fat"></div>

In some country and states, it is mendatory to give the detailed quantity of salt, sugar, fat and proteins. These informations give us a more accurate insight about the healthiness. For instance here is an interesting property: if a product contains sugar it is likely to either not contain fat at all (sweets) or contain an equivalent amount of fat.

## How relevant is the nutritive grade?

The _nutri-score_ is an attributed score for a given food product based on the amount of energy, saturated fat, sugar and sodium contained in it. The goal is to inform the consumer about the _nutritive value_. It does not take into account harmful additives!

Because the value of this score is computed by following strict rules, it should technically reflect the same thing in different countries. Right?

<div style="text-align: center; margin-top: 20px">
    <select name="grade-quantifier-select" id="grade-quantifier-select"></select><select name="grade-category-select" id="grade-category-select"></select>
</div>
<div id="nutrition-grade"></div>

Well, it seems that the United States have better grades for product containing a lot of additives, compared to the world distribution. Why so? One possible explanation being the lack of transparency, in fact corporations there are not obliged to write all the ingredients thus affecting our scoring system.

<div id="top-country-additives"></div>

Still, if we have a broader look at the data we can clearly see that North America in general tends to sell products with a lot of additives, as opposed to Europe.

<div id="additives-per-product"></div>

Moreover the number of additives per product follows very accurately an exponential distribution. There even exists a product which contains 38 known additives. Yuck!

Before going further, let's clarify the term "additive". A food additive is an added substance to preserve flavor, enhance its taste, appearance, or other qualities. Not all additives are synthetic, in fact some of them have been naturally used for centuries such as salt or vinegar. However not all additives are completely safe for us, as for `E250`.

<div id="top-additives"></div>

The above depicts the distribution of additives among products around the world. Most of them are emulsifiers, food colouring and preservatives.

What about dangerous ingredients such as palm oil?

<div id="top-country-palm-oil"></div>

While the United States are represented as not using much palm oil, it turns out they simply have a different _name_ for it: "vegetable oil"!

# Impact of social status on nutritive health

```TODO```
