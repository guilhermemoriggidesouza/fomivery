INSERT INTO org (
    id, name, tenant, address, icon, telephone, email, bg_color, font_color, 
    bg_image, bg_color_screen, salesman, pay_day, delivery_tax, tax_per_km
) VALUES (
    1, 'orgTest', 'test', 'Rua Cristina Caetano Machado, 1252, Santa Rita, Santa Bárbara do Oeste',
    'https://cardap-io.com/logo/espeto-ca.jpg', '19982091290', 'guilhermemoriggidesouza@gmail.com',
    '#ccc', '#000', NULL, 'green', 'Moriggi', strftime('%s', '2024-11-09'), 2, 2
);