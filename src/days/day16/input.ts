export const eg1 = {
fieldData: `
class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50`,

yourTicket: `7,1,14`,

nearbyTickets: `
7,3,47
40,4,50
55,2,20
38,6,12`
};

export const input = {
fieldData: `
departure location: 40-152 or 161-969
departure station: 39-838 or 845-971
departure platform: 39-209 or 217-970
departure track: 47-76 or 82-955
departure date: 41-167 or 178-949
departure time: 25-652 or 660-953
arrival location: 36-798 or 810-964
arrival station: 30-688 or 702-973
arrival platform: 44-248 or 268-969
arrival track: 45-536 or 552-956
class: 29-751 or 760-951
duration: 40-912 or 934-971
price: 44-896 or 911-965
route: 32-582 or 590-953
row: 46-269 or 282-971
seat: 49-114 or 134-971
train: 37-395 or 401-969
type: 43-180 or 206-960
wagon: 41-462 or 480-953
zone: 35-411 or 427-960`,

yourTicket: `139,109,61,149,101,89,103,53,107,59,73,151,71,67,97,113,83,163,137,167`,

nearbyTickets: `
660,948,772,679,610,713,875,887,750,335,895,553,774,802,797,336,823,566,861,599
428,760,595,55,490,877,63,570,742,735,830,854,566,989,292,748,445,876,677,329
396,92,686,894,353,668,666,794,743,142,604,344,437,440,352,680,439,431,636,385
319,322,318,301,736,485,727,437,679,486,129,516,488,643,560,880,384,846,609,644
851,865,837,744,150,624,140,569,627,733,607,352,221,630,731,212,331,713,674,635
690,681,593,411,865,494,673,814,482,707,626,636,384,661,857,514,896,613,526,941
64,720,331,225,602,4,90,719,739,83,887,101,559,603,616,872,782,349,450,320
235,449,339,427,24,770,554,428,646,235,851,710,234,911,823,489,436,336,324,652
827,863,569,290,483,286,432,592,619,306,790,405,443,333,57,399,355,60,674,102
669,429,282,362,368,400,714,819,582,766,485,344,785,449,302,771,561,650,288,946
875,107,715,780,53,178,405,284,484,497,400,395,817,848,729,139,725,61,240,245
206,747,761,710,941,592,66,714,770,100,328,299,510,677,426,104,712,145,721,310
881,865,651,574,495,591,321,355,764,774,92,864,661,438,745,667,563,783,754,813
235,53,888,820,374,642,457,740,877,824,555,343,410,154,53,629,285,432,864,56
18,439,247,247,718,148,315,628,441,286,648,639,102,783,730,849,813,284,163,244
93,497,233,396,107,631,331,777,230,507,848,879,786,494,448,482,315,506,456,493
568,63,425,443,348,597,145,712,350,633,631,51,779,735,879,232,229,618,600,771
591,440,145,489,881,555,864,847,597,574,987,486,824,872,148,623,711,220,482,362
217,320,113,70,313,751,509,81,404,229,286,525,114,647,743,590,366,166,660,796
861,407,621,180,751,376,636,378,282,159,686,559,96,497,766,374,101,320,338,294
936,788,154,499,318,580,516,564,392,710,663,339,935,309,590,611,729,489,860,866
408,624,398,811,721,349,554,282,730,732,300,875,283,221,557,620,875,743,838,345
489,748,628,326,67,713,151,399,447,853,670,289,773,314,375,308,382,208,574,519
787,368,331,608,318,51,71,140,484,704,207,371,638,323,334,387,166,852,438,691
733,99,989,427,671,817,814,775,354,406,883,446,295,86,380,491,339,318,71,344
715,943,712,734,604,329,600,287,858,297,296,19,621,137,608,430,608,503,222,706
369,408,611,851,580,62,346,886,785,231,509,337,845,296,362,309,555,590,155,825
89,238,785,747,392,785,682,357,345,631,446,370,526,789,558,274,666,222,566,672
438,339,565,741,810,504,70,499,804,786,624,528,135,87,387,562,838,496,108,142
98,601,902,576,717,623,645,911,521,448,714,620,742,558,523,456,294,517,627,810
58,883,93,317,885,642,569,502,729,641,788,458,622,432,646,101,300,947,900,508
828,360,435,542,505,534,748,558,816,516,935,112,306,650,307,329,299,326,828,631
571,114,460,674,482,97,683,939,457,552,323,207,862,400,430,227,712,594,110,846
597,244,289,883,636,229,708,607,481,162,888,287,391,429,908,145,105,64,854,225
885,312,770,911,288,475,96,349,324,590,505,889,438,618,148,646,511,356,728,555
599,308,371,441,146,385,838,143,107,868,529,117,878,343,855,516,100,368,305,89
395,445,790,148,765,462,403,695,946,394,777,823,569,162,720,668,401,163,144,942
742,769,881,712,608,936,495,372,944,892,594,525,725,21,501,891,816,686,811,304
883,302,287,911,60,786,54,376,674,298,611,499,815,179,374,405,483,364,718,10
896,340,638,323,299,829,143,740,106,344,572,482,865,869,321,80,480,448,788,371
281,57,493,735,821,580,429,819,148,444,403,353,303,515,360,854,580,738,307,90
500,590,725,798,880,354,866,432,811,51,268,76,630,178,509,718,978,616,554,442
459,431,147,291,570,862,91,165,816,397,453,747,613,343,855,862,344,765,327,774
354,713,600,699,838,388,411,139,562,293,526,358,871,790,665,847,339,71,678,790
571,314,139,728,299,497,614,846,293,575,382,459,325,383,79,374,640,791,793,942
163,238,516,461,911,601,288,59,373,292,650,486,776,516,327,850,109,832,725,998
646,443,67,790,620,626,442,349,761,501,432,65,936,433,494,932,581,94,729,309
676,716,244,716,387,871,161,244,324,384,311,311,448,900,512,619,513,394,446,228
66,868,380,945,556,938,341,496,604,323,576,854,76,210,145,65,409,728,296,136
785,830,228,403,285,247,754,152,228,607,165,845,375,894,741,301,597,612,490,428
628,61,89,231,327,335,760,825,371,686,678,346,144,492,750,466,162,717,746,315
370,794,577,345,739,290,740,568,292,941,61,787,115,676,514,151,533,244,814,612
765,777,525,495,727,448,887,647,338,728,59,831,74,405,384,631,745,681,15,637
444,319,161,637,358,512,225,521,285,855,342,573,651,70,659,646,161,108,627,631
652,556,93,63,606,639,118,730,530,716,491,744,832,349,845,848,890,410,827,321
874,381,854,80,136,436,645,764,679,883,509,90,488,621,386,148,486,705,449,113
534,137,124,89,619,243,522,290,433,166,640,406,403,406,107,494,859,503,864,494
333,114,406,74,686,716,704,510,791,313,689,509,613,360,343,500,573,606,134,743
612,394,660,303,567,245,703,145,222,839,891,88,912,219,445,882,620,355,165,675
508,311,165,845,881,419,688,459,148,723,940,686,830,740,444,560,823,578,502,618
818,325,734,871,339,429,762,683,612,637,617,291,694,109,674,832,326,430,629,232
347,618,248,505,536,742,344,61,287,869,345,632,948,132,566,729,940,863,683,675
325,140,848,492,754,738,311,730,704,854,744,854,944,505,600,404,388,494,742,881
374,268,376,373,720,362,406,409,74,946,802,54,942,774,769,352,743,306,50,73
375,76,440,406,57,300,431,178,756,630,723,881,362,765,388,784,484,378,434,318
65,667,527,144,292,272,493,378,52,299,481,286,516,356,431,575,324,852,99,508
679,783,307,221,247,409,683,671,358,711,753,938,316,336,410,303,744,289,380,482
730,688,641,67,767,830,237,368,591,555,333,528,722,866,289,803,70,458,331,393
59,731,234,609,582,404,948,436,90,506,674,651,83,173,314,446,878,873,711,82
816,311,405,509,716,346,113,68,727,51,51,781,479,797,72,457,230,742,439,461
675,489,510,760,747,816,651,810,786,440,741,763,573,887,382,719,397,432,411,866
113,638,433,745,730,616,143,859,13,783,71,374,949,314,574,315,369,712,518,612
408,717,539,631,685,60,96,332,395,826,447,104,495,358,227,405,366,561,161,145
445,606,238,350,90,489,676,287,408,402,738,241,324,720,299,909,618,834,56,793
244,70,240,741,467,705,302,336,225,56,561,849,875,309,521,366,342,481,888,591
219,446,750,687,832,799,575,661,885,346,428,71,386,451,84,519,391,561,726,366
98,596,946,621,632,513,524,57,810,892,851,4,838,596,289,86,864,242,604,460
524,512,100,827,767,672,728,328,520,594,305,427,748,144,309,690,645,627,284,679
629,773,617,650,95,242,688,941,750,808,771,389,863,641,871,247,244,461,854,147
403,567,787,101,771,486,323,756,727,86,708,529,282,767,720,604,406,378,577,60
638,334,875,209,581,851,868,487,393,788,729,61,883,342,176,73,862,836,180,384
458,638,530,861,580,853,524,848,534,150,740,845,399,71,352,364,850,677,812,208
909,163,348,229,380,644,828,708,652,812,591,394,785,457,611,353,438,853,775,643
608,367,706,642,379,86,817,180,152,362,938,855,818,462,485,401,775,164,697,494
635,221,638,833,516,943,881,812,570,168,567,688,817,860,90,813,895,60,105,784
410,790,606,702,590,236,593,570,444,140,743,74,401,83,140,844,667,282,575,444
787,285,631,111,101,600,890,107,178,73,298,576,708,677,743,547,621,454,683,608
759,290,140,836,622,296,760,378,499,353,330,456,429,825,948,225,858,776,233,630
109,52,605,297,452,788,228,861,241,459,765,626,326,95,538,787,358,719,686,795
786,293,402,799,779,71,311,946,366,911,441,709,497,180,845,71,569,837,628,794
775,723,294,527,442,348,733,52,633,784,712,794,72,54,895,169,518,788,732,765
425,459,352,64,320,139,498,878,105,733,880,167,228,405,491,715,575,559,790,606
77,710,849,558,113,636,285,738,144,718,407,335,390,236,562,143,770,577,375,671
942,364,114,832,979,329,380,82,483,792,852,895,56,732,430,365,675,649,857,457
245,740,479,378,314,516,833,878,453,782,94,566,861,640,606,376,590,301,728,829
339,72,150,890,769,283,383,126,723,827,602,511,791,370,486,64,911,891,434,503
942,434,66,316,845,880,137,875,111,854,446,723,504,546,708,577,58,829,114,387
747,320,629,610,529,569,765,139,532,871,651,667,442,150,351,938,576,619,542,439
666,722,879,761,977,597,316,876,668,882,500,289,706,90,713,110,87,573,344,147
626,749,744,389,517,631,677,360,236,576,377,436,574,567,661,624,429,312,115,379
561,761,571,828,408,331,409,856,442,79,776,647,384,845,233,615,427,776,643,731
491,619,230,220,599,670,749,480,577,509,165,641,553,702,498,337,391,491,18,671
446,332,698,358,591,682,343,662,786,938,512,60,411,762,380,745,860,730,449,393
311,704,988,381,386,764,501,388,725,70,733,881,379,812,301,827,411,480,671,224
304,152,760,848,482,98,62,285,325,285,623,626,716,394,449,589,487,633,482,54
312,650,738,144,810,531,912,419,590,825,485,624,356,709,577,432,448,268,877,943
357,667,816,482,141,288,66,143,305,425,453,350,68,62,571,937,669,346,379,760
268,817,618,428,444,705,665,56,245,943,725,61,650,868,739,834,979,494,607,443
296,208,662,878,732,247,377,871,16,734,561,142,369,229,294,872,575,150,53,676
787,437,452,813,824,460,666,664,557,435,715,712,762,352,410,746,221,101,423,735
57,360,320,937,491,640,94,600,572,519,581,612,497,945,782,387,652,55,830,131
353,223,792,176,614,402,784,569,386,882,944,705,725,248,747,449,881,409,226,778
488,73,887,332,897,882,743,147,292,85,142,383,286,527,847,135,362,714,556,232
457,431,984,853,597,242,620,337,304,891,609,568,457,512,234,437,365,943,617,579
624,93,508,654,598,456,534,458,888,768,237,811,825,446,617,310,816,866,817,90
762,749,324,648,821,91,440,991,98,650,644,286,226,246,604,728,716,403,452,559
347,483,332,493,497,246,856,162,436,370,365,488,103,60,872,752,794,293,620,945
773,66,508,430,383,58,882,668,603,676,624,314,270,410,854,748,747,703,246,102
612,662,567,303,881,742,793,912,911,668,864,641,403,605,346,159,881,515,498,822
764,503,292,148,838,611,427,178,299,866,846,680,759,780,868,378,936,114,877,938
618,709,646,830,364,782,639,546,524,872,682,325,604,54,76,354,616,557,520,868
73,670,716,103,778,108,533,272,612,89,602,86,67,226,87,294,506,332,660,354
84,679,781,798,673,370,307,619,380,890,97,838,618,242,385,661,305,827,799,109
782,244,630,785,566,574,746,515,650,818,341,521,239,437,768,445,395,432,2,777
126,85,462,166,315,51,104,99,640,151,730,487,389,436,718,332,872,436,561,558
243,560,572,748,372,348,179,833,889,861,827,335,223,414,440,449,446,355,409,717
686,719,329,867,490,576,400,393,860,863,845,791,138,705,234,303,152,670,217,851
139,591,348,909,938,401,612,52,351,328,311,74,514,163,663,686,238,527,90,103
237,614,939,465,738,451,863,269,664,821,773,574,912,893,441,236,772,812,670,874
336,829,410,391,944,137,760,139,936,639,71,359,526,771,118,607,708,857,846,289
736,746,300,891,697,486,631,361,95,872,533,527,761,572,565,672,492,795,459,497
751,447,781,129,348,825,178,720,392,74,293,375,751,222,853,851,381,835,69,790
796,373,741,391,876,455,350,496,433,811,663,565,684,785,94,376,138,16,391,489
387,750,109,218,522,622,320,658,480,223,773,435,795,645,750,824,794,720,825,455
637,339,776,641,278,732,100,166,312,138,287,247,331,610,641,71,316,313,819,578
866,111,737,145,57,772,894,743,521,439,883,861,289,102,839,409,247,50,562,681
295,819,402,71,648,301,217,143,117,574,623,461,730,484,148,590,778,880,355,500
72,54,81,849,772,485,765,66,786,680,287,69,444,363,594,615,427,527,734,811
581,734,96,846,716,814,9,796,284,722,113,152,440,762,434,534,578,95,59,429
608,633,488,782,760,600,976,448,373,493,565,248,389,582,345,335,606,232,593,736
219,725,895,222,828,798,293,403,849,771,300,180,353,769,154,567,634,289,55,575
367,767,943,651,703,318,671,870,699,108,749,289,943,451,850,580,674,178,619,142
335,530,408,301,732,488,947,499,638,52,598,316,598,235,162,771,117,946,314,614
485,637,892,832,678,734,682,853,896,713,484,300,644,620,688,658,773,670,99,633
571,248,444,782,763,223,838,836,247,245,448,54,431,919,608,749,358,821,384,524
687,208,871,777,387,825,643,138,569,752,641,206,449,535,394,404,631,139,499,161
245,109,713,624,553,152,75,377,836,471,848,868,56,948,512,670,558,443,578,246
825,620,501,553,723,139,287,735,886,87,556,812,227,754,451,687,745,717,485,855
382,372,219,632,57,428,427,114,740,866,87,227,301,404,69,613,164,979,891,244
602,101,713,144,351,76,749,646,350,567,630,241,873,749,148,498,233,622,654,687
320,890,434,359,162,401,402,823,426,113,873,235,557,578,102,817,868,740,562,738
495,788,503,93,344,360,873,944,663,461,376,112,750,885,978,566,600,377,57,221
707,483,620,844,304,947,912,299,670,948,941,336,621,73,794,733,458,232,327,102
736,398,67,866,643,206,817,876,703,320,504,352,448,748,669,834,506,640,573,575
604,435,342,141,634,644,294,859,288,389,471,438,596,795,506,813,510,815,876,95
731,284,66,795,532,360,781,827,619,505,768,781,827,732,24,386,735,57,714,336
805,304,645,855,348,820,867,816,560,431,616,64,410,217,849,511,668,317,433,819
771,90,244,873,398,58,579,581,912,875,787,837,561,404,309,650,163,435,662,56
310,90,341,530,161,381,612,469,373,357,483,616,560,110,378,705,268,388,341,876
774,512,724,600,853,455,476,681,360,626,602,706,665,533,395,432,297,135,163,887
664,529,283,704,744,94,629,822,562,783,937,318,324,338,818,395,723,846,81,373
605,791,762,512,594,899,523,328,638,846,337,242,305,853,875,519,619,892,634,321
708,850,295,52,104,410,911,739,485,480,140,437,856,946,388,355,661,69,399,429
573,148,339,376,612,569,493,403,460,7,677,833,564,86,633,356,711,637,284,135
576,868,527,601,333,721,562,93,594,312,143,833,136,842,315,606,856,642,557,529
828,738,108,412,884,345,330,662,287,338,646,335,454,345,331,816,579,306,385,440
357,219,318,651,938,854,104,208,572,392,445,307,105,877,364,892,244,53,248,397
672,348,887,213,59,590,99,524,404,778,556,244,73,779,364,236,243,636,238,813
567,676,876,355,712,858,340,561,515,697,945,760,382,484,497,427,615,767,220,382
599,390,656,506,62,579,521,676,148,484,207,310,666,573,772,51,180,71,561,836
516,387,556,646,64,509,113,949,515,581,369,354,233,393,583,524,90,776,149,552
615,315,230,507,371,149,791,827,760,93,645,162,534,947,749,349,935,321,274,611
354,722,171,54,351,627,382,649,315,516,105,649,442,849,361,529,512,709,511,51
943,123,740,772,394,144,141,365,507,294,743,879,772,411,366,134,381,74,706,307
499,612,834,891,334,828,227,63,810,882,668,681,452,946,631,712,335,867,660,757
401,455,790,783,338,111,232,643,333,443,663,612,438,992,450,224,679,231,582,705
339,854,331,495,686,499,698,533,731,711,85,491,283,882,221,894,487,372,816,74
636,218,883,458,737,673,877,366,110,657,221,439,876,664,574,717,300,736,343,532
613,612,408,765,879,664,610,141,496,63,226,682,707,626,162,0,363,883,605,615
796,717,100,937,541,402,688,102,439,687,662,245,98,617,360,488,815,553,577,358
746,152,240,308,104,164,825,602,223,787,375,522,323,565,276,217,506,566,150,864
223,641,223,72,319,716,483,798,304,612,359,486,710,274,288,779,352,402,147,646
74,92,451,434,225,319,776,299,60,370,376,489,869,503,398,354,315,294,368,887
607,499,852,144,853,624,105,208,633,845,439,882,579,595,573,120,71,65,514,385
716,224,609,490,709,912,392,99,272,161,436,353,770,343,711,506,509,875,238,374
845,591,626,712,100,701,665,337,738,289,332,313,109,661,113,451,410,834,813,723
66,443,847,530,486,7,152,630,710,231,713,441,686,167,58,299,935,866,379,150
787,329,407,317,892,139,449,708,396,496,393,75,785,86,243,149,617,737,791,554
325,946,288,275,138,486,140,325,869,878,94,242,851,150,535,518,869,149,235,674
345,763,208,341,825,684,284,350,748,61,572,872,531,587,243,798,847,641,461,748
285,723,139,824,561,826,428,949,778,539,72,853,242,821,526,148,488,520,848,370
736,594,800,628,598,760,356,748,106,624,152,939,452,288,872,454,835,798,816,231
562,711,69,502,836,823,574,767,236,902,598,643,376,321,649,311,835,590,608,601
709,895,50,316,506,879,823,526,435,730,620,352,226,322,361,988,455,867,779,732
780,60,621,863,623,166,670,608,845,868,734,724,112,221,347,229,764,15,603,304
738,939,331,607,838,798,99,152,633,51,495,577,60,75,755,222,348,827,779,450
307,886,506,226,224,65,89,51,662,517,734,301,610,52,854,625,179,624,14,283
492,944,276,887,833,576,819,221,516,607,455,393,710,405,911,949,642,371,818,376
151,640,64,91,484,719,935,868,225,858,911,459,864,658,743,502,616,151,393,791
498,612,446,768,51,511,101,762,289,625,321,92,808,102,682,345,385,533,638,437
313,524,824,69,223,52,936,70,315,104,557,378,710,68,556,558,351,481,882,5
437,482,779,790,24,852,720,51,708,823,439,341,149,866,303,75,76,406,703,358
352,634,649,54,526,440,103,575,764,977,52,669,887,831,245,431,370,110,390,674
557,634,489,935,312,651,500,624,878,353,238,688,502,554,641,150,390,1,869,497
747,716,409,533,639,129,603,110,864,681,858,411,179,179,498,319,576,725,178,517
862,380,889,633,712,619,243,910,828,713,179,343,58,867,603,500,750,569,229,62
663,434,650,884,137,773,518,557,643,935,343,247,717,474,150,367,514,797,222,721
590,442,306,753,789,315,749,93,306,525,934,243,142,948,574,152,292,316,136,532
472,268,484,237,637,451,847,645,616,940,498,772,867,600,787,894,643,107,59,872
112,299,461,621,817,606,784,672,457,450,69,427,299,78,502,601,856,688,291,134
149,564,741,491,615,643,631,162,609,838,837,604,105,252,855,819,73,709,517,444
831,777,86,516,406,91,248,716,703,121,460,293,609,147,107,428,63,339,241,346
947,880,755,854,684,307,643,240,858,55,373,943,814,269,772,824,660,561,291,682
231,864,296,863,130,767,308,513,450,461,226,137,678,687,775,737,334,624,482,452
934,626,744,518,820,354,60,719,332,90,663,579,680,775,800,576,773,573,335,62
618,785,64,95,861,704,315,528,560,389,73,705,890,566,452,595,793,339,470,94
104,86,647,153,307,381,611,72,75,609,339,65,221,302,765,56,110,328,352,494
88,236,892,729,418,528,151,436,451,446,703,112,865,628,710,748,297,286,636,796
109,449,459,582,242,838,502,582,494,59,448,823,375,813,287,419,390,828,88,732
428,65,310,869,487,284,290,454,505,135,641,302,760,91,478,138,75,631,235,336
539,235,794,206,377,650,72,880,245,75,865,536,226,934,496,778,393,379,594,645
395,591,820,343,788,759,888,825,505,862,440,374,336,109,109,637,292,622,731,944
290,720,387,326,638,461,851,180,602,678,113,72,490,494,896,102,557,782,20,92
574,235,489,442,143,346,564,111,765,113,647,313,289,405,994,774,209,106,335,136
639,327,787,628,591,51,945,557,938,301,235,624,445,647,306,622,377,825,23,488
323,831,894,432,800,383,622,669,789,625,834,329,873,608,370,850,114,892,683,87
481,225,373,685,742,751,83,248,878,238,870,734,452,104,216,607,329,553,614,179
63,678,772,646,865,208,750,269,869,708,218,772,338,938,692,888,845,358,631,495
886,780,629,489,322,793,401,799,524,651,941,862,362,521,740,681,219,849,737,141
111,353,363,151,294,313,663,502,575,276,624,626,402,218,678,818,404,324,853,816
236,318,236,352,322,735,882,678,304,384,993,734,145,866,92,221,667,109,608,451
299,288,949,329,383,217,569,825,113,597,826,847,727,19,766,288,746,165,521,648
672,84,988,739,630,373,688,558,788,822,797,431,141,112,615,490,835,283,353,307
895,405,602,565,61,736,878,217,464,608,331,92,72,579,134,403,73,428,484,289
649,52,708,552,675,869,940,6,61,391,291,894,331,774,786,395,828,556,235,72
332,758,595,369,745,743,385,437,640,684,97,936,536,725,322,734,313,287,401,138
361,434,671,135,347,765,461,533,92,857,560,166,228,689,834,103,651,151,582,878`
};