-- SpiritSpawner ServerScript
-- Put this in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Workspace = game:GetService("Workspace")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local SpiritData = require(ReplicatedStorage:WaitForChild("SpiritData"))
local CollectSpiritEvent = Instance.new("RemoteEvent")
CollectSpiritEvent.Name = "CollectSpirit"
CollectSpiritEvent.Parent = ReplicatedStorage:WaitForChild("Events")

-- Configuration
local SPAWN_RADIUS = 100 -- how far from center spirits can spawn
local MAX_SPIRITS = 20 -- max spirits in world at once
local SPAWN_INTERVAL = 3 -- seconds between spawn attempts

-- Create SpiritFolder
local SpiritFolder = Instance.new("Folder")
SpiritFolder.Name = "SpiritFolder"
SpiritFolder.Parent = Workspace

-- Create spawn zone (invisible part that defines spawn area)
local SpawnZone = Instance.new("Part")
SpawnZone.Name = "SpawnZone"
SpawnZone.Size = Vector3.new(SPAWN_RADIUS * 2, 50, SPAWN_RADIUS * 2)
SpawnZone.Position = Vector3.new(0, 25, 0)
SpawnZone.Anchored = true
SpawnZone.CanCollide = false
SpawnZone.Transparency = 1
SpawnZone.Parent = Workspace

-- Function to create a spirit model
local function CreateSpiritModel(spiritId, position)
	local data = SpiritData[spiritId]
	if not data then return nil end
	
	-- Create spirit part
	local spirit = Instance.new("Part")
	spirit.Name = spiritId
	spirit.Shape = Enum.PartType.Ball
	spirit.Size = Vector3.new(4, 4, 4)
	spirit.Position = position
	spirit.Anchored = true
	spirit.CanCollide = false
	spirit.Color = data.Color
	spirit.Material = Enum.Material.Neon
	spirit.Transparency = 0.3
	spirit.Parent = SpiritFolder
	
	-- Add glow effect
	local glow = Instance.new("PointLight")
	glow.Name = "Glow"
	glow.Color = data.Color
	glow.Brightness = 2
	glow.Range = 10
	glow.Parent = spirit
	
	-- Add name tag
	local billboard = Instance.new("BillboardGui")
	billboard.Name = "NameTag"
	billboard.Size = UDim2.new(0, 100, 0, 50)
	billboard.StudsOffset = Vector3.new(0, 3, 0)
	billboard.AlwaysOnTop = true
	billboard.Parent = spirit
	
	local nameLabel = Instance.new("TextLabel")
	nameLabel.Name = "Name"
	nameLabel.Size = UDim2.new(1, 0, 0.5, 0)
	nameLabel.BackgroundTransparency = 1
	nameLabel.Text = data.Name
	nameLabel.TextColor3 = data.Color
	nameLabel.TextStrokeTransparency = 0
	nameLabel.Font = Enum.Font.GothamBold
	nameLabel.TextSize = 14
	nameLabel.Parent = billboard
	
	local rarityLabel = Instance.new("TextLabel")
	rarityLabel.Name = "Rarity"
	rarityLabel.Size = UDim2.new(1, 0, 0.5, 0)
	rarityLabel.Position = UDim2.new(0, 0, 0.5, 0)
	rarityLabel.BackgroundTransparency = 1
	rarityLabel.Text = data.Rarity
	rarityLabel.TextColor3 = Color3.fromRGB(255, 255, 255)
	rarityLabel.TextStrokeTransparency = 0
	rarityLabel.Font = Enum.Font.Gotham
	rarityLabel.TextSize = 10
	rarityLabel.Parent = billboard
	
	-- Add float animation
	local floatScript = Instance.new("Script")
	floatScript.Name = "FloatAnimation"
	floatScript.Source = [[
		local part = script.Parent
		local startY = part.Position.Y
		local time = 0
		
		while part and part.Parent do
			time = time + 0.05
			part.Position = Vector3.new(part.Position.X, startY + math.sin(time) * 0.5, part.Position.Z)
			part.Rotation = Vector3.new(0, time * 20, 0)
			wait(0.05)
		end
	]]
	floatScript.Parent = spirit
	
	-- Add collection hitbox (invisible, larger)
	local hitbox = Instance.new("Part")
	hitbox.Name = "CollectionHitbox"
	hitbox.Size = Vector3.new(8, 8, 8)
	hitbox.Position = position
	hitbox.Anchored = true
	hitbox.CanCollide = false
	hitbox.Transparency = 1
	hitbox.Parent = spirit
	
	-- Store spirit data
	spirit:SetAttribute("SpiritId", spiritId)
	spirit:SetAttribute("Rarity", data.Rarity)
	
	return spirit
end

-- Function to spawn a random spirit
local function SpawnSpirit()
	-- Check max spirits
	if #SpiritFolder:GetChildren() >= MAX_SPIRITS then
		return
	end
	
	-- Get random position within spawn zone
	local x = math.random(-SPAWN_RADIUS, SPAWN_RADIUS)
	local z = math.random(-SPAWN_RADIUS, SPAWN_RADIUS)
	local position = Vector3.new(x, 5, z)
	
	-- Get random spirit type
	local spiritId = SpiritData:GetRandomSpirit()
	
	-- Create the spirit
	CreateSpiritModel(spiritId, position)
	
	print("Spawned spirit:", spiritId, "at", position)
end

-- Spawn initial spirits
for i = 1, 10 do
	SpawnSpirit()
	wait(0.1)
end

-- Continuous spawning
spawn(function()
	while true do
		wait(SPAWN_INTERVAL)
		SpawnSpirit()
	end
end)

-- Handle spirit collection
CollectSpiritEvent.OnServerEvent:Connect(function(player, spirit)
	if not spirit or not spirit.Parent then return end
	
	local spiritId = spirit:GetAttribute("SpiritId")
	if not spiritId then return end
	
	-- Add to player's collection (you'll expand this with DataStore later)
	local playerData = player:FindFirstChild("SpiritCollection")
	if not playerData then
		playerData = Instance.new("Folder")
		playerData.Name = "SpiritCollection"
		playerData.Parent = player
	end
	
	local spiritCount = Instance.new("IntValue")
	spiritCount.Name = spiritId .. "_" .. tick() -- unique name
	spiritCount.Value = 1
	spiritCount.Parent = playerData
	
	-- Remove spirit from world
	spirit:Destroy()
	
	-- Notify player
	local data = SpiritData[spiritId]
	print(player.Name .. " collected " .. data.Name .. "!")
end)

print("Spirit Spawner loaded!")
