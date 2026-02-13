insert into venues (id, name, address, city, region, country, lat, lng, category, status, created_at)
values
(gen_random_uuid(), 'SoMa Innovation Hub', '123 Howard St', 'San Francisco', 'CA', 'USA', 37.789, -122.394, 'workspace', 'active', now()),
(gen_random_uuid(), 'Mission Night Studio', '24th St', 'San Francisco', 'CA', 'USA', 37.752, -122.418, 'event', 'active', now()),
(gen_random_uuid(), 'NYC Midtown Workspace', '5th Ave', 'New York', 'NY', 'USA', 40.754, -73.984, 'workspace', 'active', now()),
(gen_random_uuid(), 'Brooklyn Creative Lab', 'Williamsburg', 'New York', 'NY', 'USA', 40.708, -73.957, 'event', 'active', now()),
(gen_random_uuid(), 'LA Tech Loft', 'Sunset Blvd', 'Los Angeles', 'CA', 'USA', 34.098, -118.329, 'office', 'active', now()),
(gen_random_uuid(), 'Santa Monica CoLab', 'Ocean Ave', 'Los Angeles', 'CA', 'USA', 34.012, -118.495, 'workspace', 'active', now()),
(gen_random_uuid(), 'London City Hub', 'Canary Wharf', 'London', 'UK', 'UK', 51.504, -0.019, 'workspace', 'active', now()),
(gen_random_uuid(), 'Shoreditch Collective', 'Old St', 'London', 'UK', 'UK', 51.525, -0.087, 'event', 'active', now()),
(gen_random_uuid(), 'Tokyo Shibuya Lab', 'Shibuya', 'Tokyo', 'JP', 'Japan', 35.659, 139.700, 'workspace', 'active', now()),
(gen_random_uuid(), 'Berlin Mitte Space', 'Mitte', 'Berlin', 'DE', 'Germany', 52.520, 13.405, 'workspace', 'active', now());
