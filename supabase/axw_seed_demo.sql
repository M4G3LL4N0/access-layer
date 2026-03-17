insert into venues (id, name, slug, city, region, country, status, metadata)
values
  ('11111111-1111-1111-1111-111111111111', 'AXW Demo Venue LA', 'axw-demo-la', 'Los Angeles', 'CA', 'USA', 'active', '{"tier":"pilot"}'),
  ('22222222-2222-2222-2222-222222222222', 'AXW Demo Venue SF', 'axw-demo-sf', 'San Francisco', 'CA', 'USA', 'active', '{"tier":"pilot"}'),
  ('33333333-3333-3333-3333-333333333333', 'AXW Demo Garage', 'axw-demo-garage', 'Los Angeles', 'CA', 'USA', 'active', '{"tier":"parking"}')
on conflict (id) do nothing;

insert into spaces (id, venue_id, name, type, floor, metadata)
values
  ('aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', '11111111-1111-1111-1111-111111111111', 'Main Floor', 'venue', '1', '{}'),
  ('aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', '11111111-1111-1111-1111-111111111111', 'VIP', 'vip', '2', '{}'),
  ('bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', '22222222-2222-2222-2222-222222222222', 'Lobby', 'venue', '1', '{}'),
  ('ccccccc1-cccc-cccc-cccc-ccccccccccc1', '33333333-3333-3333-3333-333333333333', 'Garage A', 'parking', 'P1', '{}')
on conflict (id) do nothing;

insert into entrypoints (id, venue_id, space_id, name, type, status, metadata)
values
  ('eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1', '11111111-1111-1111-1111-111111111111', 'aaaaaaa1-aaaa-aaaa-aaaa-aaaaaaaaaaa1', 'Front Door', 'door', 'active', '{}'),
  ('eeeeeee2-eeee-eeee-eeee-eeeeeeeeeee2', '11111111-1111-1111-1111-111111111111', 'aaaaaaa2-aaaa-aaaa-aaaa-aaaaaaaaaaa2', 'VIP Gate', 'gate', 'active', '{}'),
  ('fffffff1-ffff-ffff-ffff-fffffffffff1', '22222222-2222-2222-2222-222222222222', 'bbbbbbb1-bbbb-bbbb-bbbb-bbbbbbbbbbb1', 'Lobby Door', 'door', 'active', '{}'),
  ('ggggggg1-gggg-gggg-gggg-ggggggggggg1', '33333333-3333-3333-3333-333333333333', 'ccccccc1-cccc-cccc-cccc-ccccccccccc1', 'Garage Arm', 'parking_gate', 'active', '{}')
on conflict (id) do nothing;

insert into devices (id, venue_id, entrypoint_id, name, type, status, last_seen, metadata)
values
  ('ddddddd1-dddd-dddd-dddd-ddddddddddd1', '11111111-1111-1111-1111-111111111111', 'eeeeeee1-eeee-eeee-eeee-eeeeeeeeeee1', 'Scanner 1', 'qr_scanner', 'active', now(), '{}'),
  ('ddddddd2-dddd-dddd-dddd-ddddddddddd2', '11111111-1111-1111-1111-111111111111', 'eeeeeee2-eeee-eeee-eeee-eeeeeeeeeee2', 'VIP Scanner', 'qr_scanner', 'active', now(), '{}'),
  ('ddddddd3-dddd-dddd-dddd-ddddddddddd3', '22222222-2222-2222-2222-222222222222', 'fffffff1-ffff-ffff-ffff-fffffffffff1', 'Lobby Reader', 'nfc_reader', 'active', now(), '{}'),
  ('ddddddd4-dddd-dddd-dddd-ddddddddddd4', '33333333-3333-3333-3333-333333333333', 'ggggggg1-gggg-gggg-gggg-ggggggggggg1', 'Garage Kiosk', 'kiosk', 'active', now(), '{}')
on conflict (id) do nothing;

insert into credentials (id, venue_id, external_user_id, type, status, expires_at, metadata)
values
  ('ccccccc2-cccc-cccc-cccc-ccccccccccc2', '11111111-1111-1111-1111-111111111111', 'guest_demo_1', 'guest', 'active', now() + interval '1 day', '{"name":"Demo Guest 1"}'),
  ('ccccccc3-cccc-cccc-cccc-ccccccccccc3', '11111111-1111-1111-1111-111111111111', 'vip_demo_1', 'vip', 'active', now() + interval '1 day', '{"name":"VIP Demo"}'),
  ('ccccccc4-cccc-cccc-cccc-ccccccccccc4', '22222222-2222-2222-2222-222222222222', 'staff_demo_1', 'staff', 'active', now() + interval '7 day', '{"name":"SF Staff"}'),
  ('ccccccc5-cccc-cccc-cccc-ccccccccccc5', '33333333-3333-3333-3333-333333333333', 'parking_demo_1', 'parking', 'active', now() + interval '1 day', '{"plate":"8AXW123"}')
on conflict (id) do nothing;
