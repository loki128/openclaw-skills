-- Spirit Contract System v1
-- Place this in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

-- Create remote events
local ContractEvent = Instance.new("RemoteEvent")
ContractEvent.Name = "ContractEvent"
ContractEvent.Parent = ReplicatedStorage

local UseAbilityEvent = Instance.new("RemoteEvent")
UseAbilityEvent.Name = "UseAbilityEvent"
UseAbilityEvent.Parent = ReplicatedStorage

-- Spirit data
local Spirits = {
	EmberWisp = {
		name = "Ember Wisp",
		element = "Fire",
		strength = "Burn damage over time",
		drawback = "Take 10% more damage from water",
		ability = "Fireball",
		damage = 25,
		color = Color3.fromRGB(255, 100, 50)
	},
	FrostShade = {
		name = "Frost Shade", 
		element = "Ice",
		strength = "Slow enemies on hit",
		drawback = "Move 15% slower",
		ability = "Ice Shard",
		damage = 20,
		color = Color3.fromRGB(100, 200, 255)
	}
}

-- Player data storage
local PlayerContracts = {}

-- Create spirit NPC in world
local function CreateSpiritNPC(spiritKey, position)
	local spiritData = Spirits[spiritKey]
	
	-- Create NPC model
	local npc = Instance.new("Model")
	npc.Name = spiritData.name
	
	-- Body
	local body = Instance.new("Part")
	body.Name = "HumanoidRootPart"
	body.Size = Vector3.new(4, 6, 4)
	body.Position = position
	body.Anchored = true
	body.Color = spiritData.color
	body.Material = Enum.Material.Neon
	body.Parent = npc
	
	-- Glow effect
	local glow = Instance.new("PointLight")
	glow.Color = spiritData.color
	glow.Brightness = 2
	glow.Range = 15
	glow.Parent = body
	
	-- Floating animation
	spawn(function()
		while npc.Parent do
			body.Position = position + Vector3.new(0, math.sin(tick() * 2) * 0.5, 0)
			body.Rotation = Vector3.new(0, tick() * 20, 0)
			wait(0.03)
		end
	end)
	
	-- Click detector for interaction
	local clickDetector = Instance.new("ClickDetector")
	clickDetector.MaxActivationDistance = 15
	clickDetector.Parent = body
	
	-- Interaction prompt
	local billboard = Instance.new("BillboardGui")
	billboard.Size = UDim2.new(0, 200, 0, 60)
	billboard.StudsOffset = Vector3.new(0, 4, 0)
	billboard.AlwaysOnTop = true
	
	local textLabel = Instance.new("TextLabel")
	textLabel.Size = UDim2.new(1, 0, 1, 0)
	textLabel.BackgroundTransparency = 1
	textLabel.Text = "[E] Contract " .. spiritData.name
	textLabel.TextColor3 = spiritData.color
	textLabel.TextStrokeTransparency = 0
	textLabel.Font = Enum.Font.GothamBold
	textLabel.TextSize = 18
	textLabel.Parent = billboard
	
	billboard.Parent = body
	
	-- Handle interaction
	clickDetector.MouseClick:Connect(function(player)
		ContractEvent:FireClient(player, spiritKey, spiritData)
	end)
	
	npc.Parent = workspace
	return npc
end

-- Handle contract signing
ContractEvent.OnServerEvent:Connect(function(player, spiritKey, accept)
	if not accept then return end
	
	local spiritData = Spirits[spiritKey]
	if not spiritData then return end
	
	-- Store contract
	PlayerContracts[player.UserId] = {
		spirit = spiritKey,
		data = spiritData,
		betrayed = false,
		contractsSigned = (PlayerContracts[player.UserId] and PlayerContracts[player.UserId].contractsSigned or 0) + 1
	}
	
	-- Give ability tool
	local tool = Instance.new("Tool")
	tool.Name = spiritData.ability
	tool.RequiresHandle = false
	
	local abilityScript = Instance.new("Script")
	abilityScript.Source = [[
		tool = script.Parent
		player = game:GetService("Players").LocalPlayer
		
		tool.Activated:Connect(function()
			game:GetService("ReplicatedStorage").UseAbilityEvent:FireServer()
		end)
	]]
	abilityScript.Parent = tool
	
	tool.Parent = player.Backpack
	
	-- Notify player
	print(player.Name .. " signed contract with " .. spiritData.name)
end)

-- Handle ability use
UseAbilityEvent.OnServerEvent:Connect(function(player)
	local contract = PlayerContracts[player.UserId]
	if not contract then return end
	
	local spiritData = contract.data
	
	-- Create projectile
	local projectile = Instance.new("Part")
	projectile.Size = Vector3.new(1, 1, 1)
	projectile.Shape = Enum.PartType.Ball
	projectile.Color = spiritData.color
	projectile.Material = Enum.Material.Neon
	projectile.Position = player.Character.HumanoidRootPart.Position + Vector3.new(0, 2, 0)
	
	-- Add velocity toward mouse direction
	local mouse = player:GetMouse()
	local direction = (mouse.Hit.Position - projectile.Position).Unit
	
	local bodyVelocity = Instance.new("BodyVelocity")
	bodyVelocity.Velocity = direction * 100
	bodyVelocity.MaxForce = Vector3.new(5000, 5000, 5000)
	bodyVelocity.Parent = projectile
	
	projectile.Parent = workspace
	
	-- Damage on touch
	projectile.Touched:Connect(function(hit)
		local humanoid = hit.Parent:FindFirstChild("Humanoid")
		if humanoid and hit.Parent ~= player.Character then
			humanoid:TakeDamage(spiritData.damage)
			projectile:Destroy()
		end
	end)
	
	-- Cleanup
	game:GetService("Debris"):AddItem(projectile, 3)
end)

-- Spawn spirits in world
CreateSpiritNPC("EmberWisp", Vector3.new(0, 5, -20))
CreateSpiritNPC("FrostShade", Vector3.new(20, 5, 0))

print("Spirit Contract System Loaded!")