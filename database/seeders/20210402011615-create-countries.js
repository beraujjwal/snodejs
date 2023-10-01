'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

     await queryInterface.bulkInsert('countries', [
      {'id': 1, 'code': 'AF', 'name': 'Afghanistan',                            'phoneCode': 93, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 2, 'code': 'AL', 'name': 'Albania',                                'phoneCode': 355, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 3, 'code': 'DZ', 'name': 'Algeria',                                'phoneCode': 213, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 4, 'code': 'AS', 'name': 'American Samoa',                         'phoneCode': 1684, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 5, 'code': 'AD', 'name': 'Andorra',                                'phoneCode': 376, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 6, 'code': 'AO', 'name': 'Angola',                                 'phoneCode': 244, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 7, 'code': 'AI', 'name': 'Anguilla',                               'phoneCode': 1264, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 8, 'code': 'AQ', 'name': 'Antarctica',                             'phoneCode': 0, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 9, 'code': 'AG', 'name': 'Antigua And Barbuda',                    'phoneCode': 1268, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 10, 'code': 'AR', 'name': 'Argentina',                             'phoneCode': 54, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 11, 'code': 'AM', 'name': 'Armenia',                               'phoneCode': 374, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 12, 'code': 'AW', 'name': 'Aruba',                                 'phoneCode': 297, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 13, 'code': 'AU', 'name': 'Australia',                             'phoneCode': 61, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 14, 'code': 'AT', 'name': 'Austria',                               'phoneCode': 43, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 15, 'code': 'AZ', 'name': 'Azerbaijan',                            'phoneCode': 994, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 16, 'code': 'BS', 'name': 'Bahamas The',                           'phoneCode': 1242, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 17, 'code': 'BH', 'name': 'Bahrain',                               'phoneCode': 973, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 18, 'code': 'BD', 'name': 'Bangladesh',                            'phoneCode': 880, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 19, 'code': 'BB', 'name': 'Barbados',                              'phoneCode': 1246, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 20, 'code': 'BY', 'name': 'Belarus',                               'phoneCode': 375, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 21, 'code': 'BE', 'name': 'Belgium',                               'phoneCode': 32, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 22, 'code': 'BZ', 'name': 'Belize',                                'phoneCode': 501, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 23, 'code': 'BJ', 'name': 'Benin',                                 'phoneCode': 229, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 24, 'code': 'BM', 'name': 'Bermuda',                               'phoneCode': 1441, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 25, 'code': 'BT', 'name': 'Bhutan',                                'phoneCode': 975, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 26, 'code': 'BO', 'name': 'Bolivia',                               'phoneCode': 591, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 27, 'code': 'BA', 'name': 'Bosnia and Herzegovina',                'phoneCode': 387, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 28, 'code': 'BW', 'name': 'Botswana',                              'phoneCode': 267, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 29, 'code': 'BV', 'name': 'Bouvet Island',                         'phoneCode': 0, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 30, 'code': 'BR', 'name': 'Brazil',                                'phoneCode': 55, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 31, 'code': 'IO', 'name': 'British Indian Ocean Territory',        'phoneCode': 246, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 32, 'code': 'BN', 'name': 'Brunei',                                'phoneCode': 673, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 33, 'code': 'BG', 'name': 'Bulgaria',                              'phoneCode': 359, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 34, 'code': 'BF', 'name': 'Burkina Faso',                          'phoneCode': 226, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 35, 'code': 'BI', 'name': 'Burundi',                               'phoneCode': 257, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 36, 'code': 'KH', 'name': 'Cambodia',                              'phoneCode': 855, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 37, 'code': 'CM', 'name': 'Cameroon',                              'phoneCode': 237, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 38, 'code': 'CA', 'name': 'Canada',                                'phoneCode': 1, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 39, 'code': 'CV', 'name': 'Cape Verde',                            'phoneCode': 238, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 40, 'code': 'KY', 'name': 'Cayman Islands',                        'phoneCode': 1345, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 41, 'code': 'CF', 'name': 'Central African Republic',              'phoneCode': 236, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 42, 'code': 'TD', 'name': 'Chad',                                  'phoneCode': 235, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 43, 'code': 'CL', 'name': 'Chile',                                 'phoneCode': 56, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 44, 'code': 'CN', 'name': 'China',                                 'phoneCode': 86, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 45, 'code': 'CX', 'name': 'Christmas Island',                      'phoneCode': 61, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 46, 'code': 'CC', 'name': 'Cocos (Keeling) Islands',               'phoneCode': 672, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 47, 'code': 'CO', 'name': 'Colombia',                              'phoneCode': 57, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 48, 'code': 'KM', 'name': 'Comoros',                               'phoneCode': 269, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 49, 'code': 'CG', 'name': 'Republic Of The Congo',                 'phoneCode': 242, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 50, 'code': 'CD', 'name': 'Democratic Republic Of The Congo',      'phoneCode': 242, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 51, 'code': 'CK', 'name': 'Cook Islands',                          'phoneCode': 682, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 52, 'code': 'CR', 'name': 'Costa Rica',                            'phoneCode': 506, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 53, 'code': 'CI', 'name': 'Cote D\'\'Ivoire (Ivory Coast)',        'phoneCode': 225, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 54, 'code': 'HR', 'name': 'Croatia (Hrvatska)',                    'phoneCode': 385, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 55, 'code': 'CU', 'name': 'Cuba',                                  'phoneCode': 53, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 56, 'code': 'CY', 'name': 'Cyprus',                                'phoneCode': 357, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 57, 'code': 'CZ', 'name': 'Czech Republic',                        'phoneCode': 420, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 58, 'code': 'DK', 'name': 'Denmark',                               'phoneCode': 45, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 59, 'code': 'DJ', 'name': 'Djibouti',                              'phoneCode': 253, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 60, 'code': 'DM', 'name': 'Dominica', 'phoneCode': 1767, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 61, 'code': 'DO', 'name': 'Dominican Republic', 'phoneCode': 1809, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 62, 'code': 'TP', 'name': 'East Timor', 'phoneCode': 670, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 63, 'code': 'EC', 'name': 'Ecuador', 'phoneCode': 593, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 64, 'code': 'EG', 'name': 'Egypt', 'phoneCode': 20, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 65, 'code': 'SV', 'name': 'El Salvador', 'phoneCode': 503, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 66, 'code': 'GQ', 'name': 'Equatorial Guinea', 'phoneCode': 240, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 67, 'code': 'ER', 'name': 'Eritrea', 'phoneCode': 291, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 68, 'code': 'EE', 'name': 'Estonia', 'phoneCode': 372, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 69, 'code': 'ET', 'name': 'Ethiopia', 'phoneCode': 251, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 70, 'code': 'XA', 'name': 'External Territories of Australia', 'phoneCode': 61, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 71, 'code': 'FK', 'name': 'Falkland Islands', 'phoneCode': 500, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 72, 'code': 'FO', 'name': 'Faroe Islands', 'phoneCode': 298, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 73, 'code': 'FJ', 'name': 'Fiji Islands', 'phoneCode': 679, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 74, 'code': 'FI', 'name': 'Finland', 'phoneCode': 358, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 75, 'code': 'FR', 'name': 'France', 'phoneCode': 33, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 76, 'code': 'GF', 'name': 'French Guiana', 'phoneCode': 594, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 77, 'code': 'PF', 'name': 'French Polynesia', 'phoneCode': 689, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 78, 'code': 'TF', 'name': 'French Southern Territories', 'phoneCode': 0, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 79, 'code': 'GA', 'name': 'Gabon', 'phoneCode': 241, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 80, 'code': 'GM', 'name': 'Gambia The', 'phoneCode': 220, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 81, 'code': 'GE', 'name': 'Georgia', 'phoneCode': 995, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 82, 'code': 'DE', 'name': 'Germany', 'phoneCode': 49, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 83, 'code': 'GH', 'name': 'Ghana', 'phoneCode': 233, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 84, 'code': 'GI', 'name': 'Gibraltar', 'phoneCode': 350, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 85, 'code': 'GR', 'name': 'Greece', 'phoneCode': 30, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 86, 'code': 'GL', 'name': 'Greenland', 'phoneCode': 299, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 87, 'code': 'GD', 'name': 'Grenada', 'phoneCode': 1473, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 88, 'code': 'GP', 'name': 'Guadeloupe', 'phoneCode': 590, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 89, 'code': 'GU', 'name': 'Guam', 'phoneCode': 1671, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 90, 'code': 'GT', 'name': 'Guatemala', 'phoneCode': 502, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 91, 'code': 'XU', 'name': 'Guernsey and Alderney', 'phoneCode': 44, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 92, 'code': 'GN', 'name': 'Guinea', 'phoneCode': 224, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 93, 'code': 'GW', 'name': 'Guinea-Bissau', 'phoneCode': 245, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 94, 'code': 'GY', 'name': 'Guyana', 'phoneCode': 592, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 95, 'code': 'HT', 'name': 'Haiti', 'phoneCode': 509, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 96, 'code': 'HM', 'name': 'Heard and McDonald Islands', 'phoneCode': 0, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 97, 'code': 'HN', 'name': 'Honduras', 'phoneCode': 504, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 98, 'code': 'HK', 'name': 'Hong Kong S.A.R.', 'phoneCode': 852, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 99, 'code': 'HU', 'name': 'Hungary', 'phoneCode': 36, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 100, 'code': 'IS', 'name': 'Iceland', 'phoneCode': 354, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 101, 'code': 'IN', 'name': 'India', 'phoneCode': 91, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 102, 'code': 'ID', 'name': 'Indonesia', 'phoneCode': 62, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 103, 'code': 'IR', 'name': 'Iran', 'phoneCode': 98, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 104, 'code': 'IQ', 'name': 'Iraq', 'phoneCode': 964, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 105, 'code': 'IE', 'name': 'Ireland', 'phoneCode': 353, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 106, 'code': 'IL', 'name': 'Israel', 'phoneCode': 972, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 107, 'code': 'IT', 'name': 'Italy', 'phoneCode': 39, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 108, 'code': 'JM', 'name': 'Jamaica', 'phoneCode': 1876, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 109, 'code': 'JP', 'name': 'Japan', 'phoneCode': 81, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 110, 'code': 'XJ', 'name': 'Jersey', 'phoneCode': 44, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 111, 'code': 'JO', 'name': 'Jordan', 'phoneCode': 962, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 112, 'code': 'KZ', 'name': 'Kazakhstan', 'phoneCode': 7, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 113, 'code': 'KE', 'name': 'Kenya', 'phoneCode': 254, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 114, 'code': 'KI', 'name': 'Kiribati', 'phoneCode': 686, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 115, 'code': 'KP', 'name': 'Korea North', 'phoneCode': 850, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 116, 'code': 'KR', 'name': 'Korea South', 'phoneCode': 82, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 117, 'code': 'KW', 'name': 'Kuwait', 'phoneCode': 965, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 118, 'code': 'KG', 'name': 'Kyrgyzstan', 'phoneCode': 996, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 119, 'code': 'LA', 'name': 'Laos', 'phoneCode': 856, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 120, 'code': 'LV', 'name': 'Latvia', 'phoneCode': 371, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 121, 'code': 'LB', 'name': 'Lebanon', 'phoneCode': 961, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 122, 'code': 'LS', 'name': 'Lesotho', 'phoneCode': 266, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 123, 'code': 'LR', 'name': 'Liberia', 'phoneCode': 231, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 124, 'code': 'LY', 'name': 'Libya', 'phoneCode': 218, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 125, 'code': 'LI', 'name': 'Liechtenstein', 'phoneCode': 423, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 126, 'code': 'LT', 'name': 'Lithuania', 'phoneCode': 370, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 127, 'code': 'LU', 'name': 'Luxembourg', 'phoneCode': 352, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 128, 'code': 'MO', 'name': 'Macau S.A.R.', 'phoneCode': 853, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 129, 'code': 'MK', 'name': 'Macedonia', 'phoneCode': 389, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 130, 'code': 'MG', 'name': 'Madagascar', 'phoneCode': 261, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 131, 'code': 'MW', 'name': 'Malawi', 'phoneCode': 265, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 132, 'code': 'MY', 'name': 'Malaysia', 'phoneCode': 60, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 133, 'code': 'MV', 'name': 'Maldives', 'phoneCode': 960, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 134, 'code': 'ML', 'name': 'Mali', 'phoneCode': 223, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 135, 'code': 'MT', 'name': 'Malta', 'phoneCode': 356, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 136, 'code': 'XM', 'name': 'Man (Isle of)', 'phoneCode': 44, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 137, 'code': 'MH', 'name': 'Marshall Islands', 'phoneCode': 692, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 138, 'code': 'MQ', 'name': 'Martinique', 'phoneCode': 596, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 139, 'code': 'MR', 'name': 'Mauritania', 'phoneCode': 222, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 140, 'code': 'MU', 'name': 'Mauritius', 'phoneCode': 230, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 141, 'code': 'YT', 'name': 'Mayotte', 'phoneCode': 269, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 142, 'code': 'MX', 'name': 'Mexico', 'phoneCode': 52, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 143, 'code': 'FM', 'name': 'Micronesia', 'phoneCode': 691, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 144, 'code': 'MD', 'name': 'Moldova', 'phoneCode': 373, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 145, 'code': 'MC', 'name': 'Monaco', 'phoneCode': 377, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 146, 'code': 'MN', 'name': 'Mongolia', 'phoneCode': 976, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 147, 'code': 'MS', 'name': 'Montserrat', 'phoneCode': 1664, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 148, 'code': 'MA', 'name': 'Morocco', 'phoneCode': 212, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 149, 'code': 'MZ', 'name': 'Mozambique', 'phoneCode': 258, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 150, 'code': 'MM', 'name': 'Myanmar', 'phoneCode': 95, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 151, 'code': 'NA', 'name': 'Namibia', 'phoneCode': 264, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 152, 'code': 'NR', 'name': 'Nauru', 'phoneCode': 674, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 153, 'code': 'NP', 'name': 'Nepal', 'phoneCode': 977, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 154, 'code': 'AN', 'name': 'Netherlands Antilles', 'phoneCode': 599, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 155, 'code': 'NL', 'name': 'Netherlands The', 'phoneCode': 31, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 156, 'code': 'NC', 'name': 'New Caledonia', 'phoneCode': 687, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 157, 'code': 'NZ', 'name': 'New Zealand', 'phoneCode': 64, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 158, 'code': 'NI', 'name': 'Nicaragua', 'phoneCode': 505, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 159, 'code': 'NE', 'name': 'Niger', 'phoneCode': 227, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 160, 'code': 'NG', 'name': 'Nigeria', 'phoneCode': 234, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 161, 'code': 'NU', 'name': 'Niue', 'phoneCode': 683, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 162, 'code': 'NF', 'name': 'Norfolk Island', 'phoneCode': 672, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 163, 'code': 'MP', 'name': 'Northern Mariana Islands', 'phoneCode': 1670, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 164, 'code': 'NO', 'name': 'Norway', 'phoneCode': 47, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 165, 'code': 'OM', 'name': 'Oman', 'phoneCode': 968, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 166, 'code': 'PK', 'name': 'Pakistan', 'phoneCode': 92, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 167, 'code': 'PW', 'name': 'Palau', 'phoneCode': 680, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 168, 'code': 'PS', 'name': 'Palestinian Territory Occupied', 'phoneCode': 970, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 169, 'code': 'PA', 'name': 'Panama', 'phoneCode': 507, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 170, 'code': 'PG', 'name': 'Papua new Guinea', 'phoneCode': 675, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 171, 'code': 'PY', 'name': 'Paraguay', 'phoneCode': 595, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 172, 'code': 'PE', 'name': 'Peru', 'phoneCode': 51, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 173, 'code': 'PH', 'name': 'Philippines', 'phoneCode': 63, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 174, 'code': 'PN', 'name': 'Pitcairn Island', 'phoneCode': 0, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 175, 'code': 'PL', 'name': 'Poland', 'phoneCode': 48, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 176, 'code': 'PT', 'name': 'Portugal', 'phoneCode': 351, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 177, 'code': 'PR', 'name': 'Puerto Rico', 'phoneCode': 1787, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 178, 'code': 'QA', 'name': 'Qatar', 'phoneCode': 974, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 179, 'code': 'RE', 'name': 'Reunion', 'phoneCode': 262, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 180, 'code': 'RO', 'name': 'Romania', 'phoneCode': 40, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 181, 'code': 'RU', 'name': 'Russia', 'phoneCode': 70, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 182, 'code': 'RW', 'name': 'Rwanda', 'phoneCode': 250, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 183, 'code': 'SH', 'name': 'Saint Helena', 'phoneCode': 290, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 184, 'code': 'KN', 'name': 'Saint Kitts And Nevis', 'phoneCode': 1869, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 185, 'code': 'LC', 'name': 'Saint Lucia', 'phoneCode': 1758, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 186, 'code': 'PM', 'name': 'Saint Pierre and Miquelon', 'phoneCode': 508, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 187, 'code': 'VC', 'name': 'Saint Vincent And The Grenadines', 'phoneCode': 1784, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 188, 'code': 'WS', 'name': 'Samoa', 'phoneCode': 684, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 189, 'code': 'SM', 'name': 'San Marino', 'phoneCode': 378, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 190, 'code': 'ST', 'name': 'Sao Tome and Principe', 'phoneCode': 239, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 191, 'code': 'SA', 'name': 'Saudi Arabia', 'phoneCode': 966, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 192, 'code': 'SN', 'name': 'Senegal', 'phoneCode': 221, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 193, 'code': 'RS', 'name': 'Serbia', 'phoneCode': 381, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 194, 'code': 'SC', 'name': 'Seychelles', 'phoneCode': 248, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 195, 'code': 'SL', 'name': 'Sierra Leone', 'phoneCode': 232, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 196, 'code': 'SG', 'name': 'Singapore', 'phoneCode': 65, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 197, 'code': 'SK', 'name': 'Slovakia', 'phoneCode': 421, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 198, 'code': 'SI', 'name': 'Slovenia', 'phoneCode': 386, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 199, 'code': 'XG', 'name': 'Smaller Territories of the UK', 'phoneCode': 44, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 200, 'code': 'SB', 'name': 'Solomon Islands', 'phoneCode': 677, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 201, 'code': 'SO', 'name': 'Somalia', 'phoneCode': 252, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 202, 'code': 'ZA', 'name': 'South Africa', 'phoneCode': 27, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 203, 'code': 'GS', 'name': 'South Georgia', 'phoneCode': 0, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 204, 'code': 'SS', 'name': 'South Sudan', 'phoneCode': 211, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 205, 'code': 'ES', 'name': 'Spain', 'phoneCode': 34, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 206, 'code': 'LK', 'name': 'Sri Lanka', 'phoneCode': 94, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 207, 'code': 'SD', 'name': 'Sudan', 'phoneCode': 249, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 208, 'code': 'SR', 'name': 'Suriname', 'phoneCode': 597, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 209, 'code': 'SJ', 'name': 'Svalbard And Jan Mayen Islands', 'phoneCode': 47, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 210, 'code': 'SZ', 'name': 'Swaziland', 'phoneCode': 268, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 211, 'code': 'SE', 'name': 'Sweden', 'phoneCode': 46, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 212, 'code': 'CH', 'name': 'Switzerland', 'phoneCode': 41, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 213, 'code': 'SY', 'name': 'Syria', 'phoneCode': 963, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 214, 'code': 'TW', 'name': 'Taiwan', 'phoneCode': 886, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 215, 'code': 'TJ', 'name': 'Tajikistan', 'phoneCode': 992, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 216, 'code': 'TZ', 'name': 'Tanzania', 'phoneCode': 255, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 217, 'code': 'TH', 'name': 'Thailand', 'phoneCode': 66, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 218, 'code': 'TG', 'name': 'Togo', 'phoneCode': 228, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 219, 'code': 'TK', 'name': 'Tokelau', 'phoneCode': 690, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 220, 'code': 'TO', 'name': 'Tonga', 'phoneCode': 676, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 221, 'code': 'TT', 'name': 'Trinidad And Tobago', 'phoneCode': 1868, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 222, 'code': 'TN', 'name': 'Tunisia', 'phoneCode': 216, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 223, 'code': 'TR', 'name': 'Turkey', 'phoneCode': 90, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 224, 'code': 'TM', 'name': 'Turkmenistan', 'phoneCode': 7370, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 225, 'code': 'TC', 'name': 'Turks And Caicos Islands', 'phoneCode': 1649, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 226, 'code': 'TV', 'name': 'Tuvalu', 'phoneCode': 688, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 227, 'code': 'UG', 'name': 'Uganda', 'phoneCode': 256, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 228, 'code': 'UA', 'name': 'Ukraine', 'phoneCode': 380, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 229, 'code': 'AE', 'name': 'United Arab Emirates', 'phoneCode': 971, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 230, 'code': 'GB', 'name': 'United Kingdom', 'phoneCode': 44, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 231, 'code': 'US', 'name': 'United States', 'phoneCode': 1, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 232, 'code': 'UM', 'name': 'United States Minor Outlying Islands', 'phoneCode': 1, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 233, 'code': 'UY', 'name': 'Uruguay', 'phoneCode': 598, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 234, 'code': 'UZ', 'name': 'Uzbekistan', 'phoneCode': 998, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 235, 'code': 'VU', 'name': 'Vanuatu', 'phoneCode': 678, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 236, 'code': 'VA', 'name': 'Vatican City State (Holy See)', 'phoneCode': 39, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 237, 'code': 'VE', 'name': 'Venezuela', 'phoneCode': 58, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 238, 'code': 'VN', 'name': 'Vietnam', 'phoneCode': 84, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 239, 'code': 'VG', 'name': 'Virgin Islands (British)', 'phoneCode': 1284, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 240, 'code': 'VI', 'name': 'Virgin Islands (US)', 'phoneCode': 1340, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 241, 'code': 'WF', 'name': 'Wallis And Futuna Islands', 'phoneCode': 681, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 242, 'code': 'EH', 'name': 'Western Sahara', 'phoneCode': 212, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 243, 'code': 'YE', 'name': 'Yemen', 'phoneCode': 967, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 244, 'code': 'YU', 'name': 'Yugoslavia', 'phoneCode': 38, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 245, 'code': 'ZM', 'name': 'Zambia', 'phoneCode': 260, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()},
      {'id': 246, 'code': 'ZW', 'name': 'Zimbabwe', 'phoneCode': 263, 'status':true, 'createdAt': new Date(), 'updatedAt': new Date()}
    ],
  {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Users', null, {});
     */
     await queryInterface.bulkDelete('countries', null, {});
  }
};
