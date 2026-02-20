-- SpiritData ModuleScript
-- Put this in ReplicatedStorage

local SpiritData = {
	-- Common Spirits (White)
	FireSpirit = {
		Name = "Fire Spirit",
		Rarity = "Common",
		Color = Color3.fromRGB(255, 100, 100),
		HP = 50,
		Attack = 10,
		AttackSpeed = 1, -- attacks per second
		Range = 20,
		Speed = 16,
		Description = "A basic fire spirit. Burns enemies with fireballs."
	},
	
	WaterSpirit = {
		Name = "Water Spirit", 
		Rarity = "Common",
		Color = Color3.fromRGB(100, 150, 255),
		HP = 60,
		Attack = 8,
		AttackSpeed = 1.2,
		Range = 18,
		Speed = 14,
		Description = "A flowing water spirit. Heals slightly over time."
	},
	
	-- Uncommon Spirits (Green)
	EarthSpirit = {
		Name = "Earth Spirit",
		Rarity = "Uncommon", 
		Color = Color3.fromRGB(100, 200, 100),
		HP = 100,
		Attack = 15,
		AttackSpeed = 0.8,
		Range = 15,
		Speed = 12,
		Description = "A sturdy earth spirit. High health and defense."
	},
	
	WindSpirit = {
		Name = "Wind Spirit",
		Rarity = "Uncommon",
		Color = Color3.fromRGB(200, 255, 200), 
		HP = 70,
		Attack = 12,
		AttackSpeed = 1.5,
		Range = 25,
		Speed = 22,
		Description = "A swift wind spirit. Fast attacks and movement."
	},
	
	-- Rare Spirits (Blue)
	IceSpirit = {
		Name = "Ice Spirit",
		Rarity = "Rare",
		Color = Color3.fromRGB(150, 220, 255),
		HP = 120,
		Attack = 25,
		AttackSpeed = 1,
		Range = 22,
		Speed = 16,
		Description = "A freezing ice spirit. Slows enemies on hit."
	},
	
	ThunderSpirit = {
		Name = "Thunder Spirit",
		Rarity = "Rare",
		Color = Color3.fromRGB(255, 255, 100),
		HP = 90,
		Attack = 35,
		AttackSpeed = 0.9,
		Range = 30,
		Speed = 20,
		Description = "A shocking thunder spirit. High damage, chains to nearby enemies."
	},
	
	-- Epic Spirits (Purple)
	ShadowSpirit = {
		Name = "Shadow Spirit",
		Rarity = "Epic",
		Color = Color3.fromRGB(150, 50, 200),
		HP = 200,
		Attack = 45,
		AttackSpeed = 1.3,
		Range = 20,
		Speed = 18,
		Description = "A dark shadow spirit. Life steal on damage dealt."
	},
	
	LightSpirit = {
		Name = "Light Spirit",
		Rarity = "Epic",
		Color = Color3.fromRGB(255, 255, 200),
		HP = 150,
		Attack = 40,
		AttackSpeed = 1.4,
		Range = 28,
		Speed = 16,
		Description = "A radiant light spirit. Heals nearby allied spirits."
	},
	
	-- Legendary Spirits (Gold)
	DragonSpirit = {
		Name = "Dragon Spirit",
		Rarity = "Legendary",
		Color = Color3.fromRGB(255, 200, 50),
		HP = 500,
		Attack = 100,
		AttackSpeed = 1.2,
		Range = 40,
		Speed = 14,
		Description = "An ancient dragon spirit. Massive damage and health."
	},
	
	PhoenixSpirit = {
		Name = "Phoenix Spirit",
		Rarity = "Legendary",
		Color = Color3.fromRGB(255, 150, 50),
		HP = 350,
		Attack = 80,
		AttackSpeed = 1.5,
		Range = 35,
		Speed = 20,
		Description = "A reborn phoenix spirit. Revives once per battle at 50% HP."
	}
}

-- Helper function to get random spirit based on rarity weights
function SpiritData:GetRandomSpirit()
	local rarities = {
		{Type = "Common", Weight = 50},
		{Type = "Uncommon", Weight = 30},
		{Type = "Rare", Weight = 15},
		{Type = "Epic", Weight = 4},
		{Type = "Legendary", Weight = 1}
	}
	
	local totalWeight = 0
	for _, rarity in ipairs(rarities) do
		totalWeight = totalWeight + rarity.Weight
	end
	
	local random = math.random(1, totalWeight)
	local current = 0
	local selectedRarity = "Common"
	
	for _, rarity in ipairs(rarities) do
		current = current + rarity.Weight
		if random <= current then
			selectedRarity = rarity.Type
			break
		end
	end
	
	-- Get all spirits of selected rarity
	local spiritsOfRarity = {}
	for id, data in pairs(self) do
		if type(data) == "table" and data.Rarity == selectedRarity then
			table.insert(spiritsOfRarity, id)
		end
	end
	
	if #spiritsOfRarity > 0 then
		return spiritsOfRarity[math.random(1, #spiritsOfRarity)]
	end
	
	return "FireSpirit" -- fallback
end

return SpiritData
