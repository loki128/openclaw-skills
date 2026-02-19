-- Spirit Contract System v5 - PROPERLY WORKING
-- Place this in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local Debris = game:GetService("Debris")

-- Create remote events in ReplicatedStorage
local ShowContract = Instance.new("RemoteEvent")
ShowContract.Name = "ShowContract"
ShowContract.Parent = ReplicatedStorage

local SignContract = Instance.new("RemoteEvent")
SignContract.Name = "SignContract"
SignContract.Parent = ReplicatedStorage

-- Spirit database
local Spirits = {
	EmberWisp = {
		name = "Ember Wisp",
		element = "Fire",
		description = "A volatile spirit born from volcanic ash. Grants destructive power at a cost.",
		strength = "Burn damage over time + 25% fire damage boost",
		drawback = "Take 20% more damage from water/ice attacks",
		ability = "Fireball",
		damage = 25,
		cooldown = 2,
		color = Color3.fromRGB(255, 80, 40),
		glowColor = Color3.fromRGB(255, 120, 60),
		rarity = "Common"
	},
	FrostShade = {
		name = "Frost Shade",
		element = "Ice", 
		description = "A mournful spirit of frozen wastelands. Controls the battlefield.",
		strength = "Slow enemies by 40% on hit + ice armor",
		drawback = "Move 15% slower, fire damage increased by 15%",
		ability = "Ice Shard",
		damage = 20,
		cooldown = 1.5,
		color = Color3.fromRGB(80, 180, 255),
		glowColor = Color3.fromRGB(120, 200, 255),
		rarity = "Common"
	}
}

-- Player data
local PlayerData = {}

-- Create spirit model with ProximityPrompt
local function CreateSpiritModel(spiritKey, position)
	local data = Spirits[spiritKey]
	
	-- Main model
	local model = Instance.new("Model")
	model.Name = data.name
	
	-- Core orb
	local core = Instance.new("Part")
	core.Name = "Core"
	core.Shape = Enum.PartType.Ball
	core.Size = Vector3.new(3, 3, 3)
	core.Position = position
	core.Anchored = true
	core.Color = data.color
	core.Material = Enum.Material.Neon
	core.Transparency = 0.2
	core.Parent = model
	
	-- Outer ring
	local ring = Instance.new("Part")
	ring.Name = "Ring"
	ring.Shape = Enum.PartType.Cylinder
	ring.Size = Vector3.new(0.5, 6, 6)
	ring.Position = position
	ring.Anchored = true
	ring.Color = data.color
	ring.Material = Enum.Material.Neon
	ring.Transparency = 0.4
	ring.Parent = model
	
	-- Glow light
	local light = Instance.new("PointLight")
	light.Color = data.glowColor
	light.Brightness = 5
	light.Range = 25
	light.Parent = core
	
	-- Name tag
	local billboard = Instance.new("BillboardGui")
	billboard.Size = UDim2.new(0, 200, 0, 50)
	billboard.StudsOffset = Vector3.new(0, 4, 0)
	billboard.AlwaysOnTop = true
	
	local nameLabel = Instance.new("TextLabel")
	nameLabel.Size = UDim2.new(1, 0, 1, 0)
	nameLabel.BackgroundTransparency = 1
	nameLabel.Text = data.name:upper()
	nameLabel.TextColor3 = data.glowColor
	nameLabel.Font = Enum.Font.GothamBlack
	nameLabel.TextSize = 20
	nameLabel.TextStrokeTransparency = 0
	nameLabel.Parent = billboard
	
	billboard.Parent = core
	
	-- PROXIMITY PROMPT - This is the key interaction
	local prompt = Instance.new("ProximityPrompt")
	prompt.ActionText = "Sign Contract"
	prompt.ObjectText = data.name
	prompt.HoldDuration = 0.5
	prompt.MaxActivationDistance = 15
	prompt.KeyboardKeyCode = Enum.KeyCode.E
	prompt.Parent = core
	
	-- When prompt is triggered, fire remote to client
	prompt.Triggered:Connect(function(player)
		print(player.Name .. " triggered prompt for " .. data.name)
		-- Fire to client to show UI
		ShowContract:FireClient(player, spiritKey, data)
	end)
	
	-- Animation
	spawn(function()
		local time = 0
		while model.Parent do
			time = time + 0.03
			local floatY = math.sin(time * 2) * 0.5
			local basePos = position + Vector3.new(0, floatY, 0)
			
			ring.CFrame = CFrame.new(basePos) * CFrame.Angles(time, time * 0.5, 0)
			core.Position = basePos
			
			wait(0.03)
		end
	end)
	
	model.Parent = workspace
	print("Spawned " .. data.name)
end

-- Handle contract signing from client
SignContract.OnServerEvent:Connect(function(player, spiritKey)
	print("Server received sign request from " .. player.Name .. " for " .. tostring(spiritKey))
	
	local data = Spirits[spiritKey]
	if not data then 
		print("Invalid spirit key")
		return 
	end
	
	-- Initialize player data
	if not PlayerData[player.UserId] then
		PlayerData[player.UserId] = { contracts = {}, activeContract = nil }
	end
	
	local pdata = PlayerData[player.UserId]
	
	-- Store contract
	pdata.contracts[spiritKey] = { signed = true, loyalty = 100 }
	pdata.activeContract = spiritKey
	
	-- Clear old tools
	for _, tool in pairs(player.Backpack:GetChildren()) do
		if tool:IsA("Tool") then tool:Destroy() end
	end
	if player.Character then
		for _, tool in pairs(player.Character:GetChildren()) do
			if tool:IsA("Tool") then tool:Destroy() end
		end
	end
	
	-- Create ability tool
	local tool = Instance.new("Tool")
	tool.Name = data.ability
	tool.RequiresHandle = false
	
	-- Tool activated
	tool.Activated:Connect(function()
		local character = player.Character
		if not character then return end
		
		local hrp = character:FindFirstChild("HumanoidRootPart")
		if not hrp then return end
		
		-- Create projectile
		local projectile = Instance.new("Part")
		projectile.Size = Vector3.new(1.5, 1.5, 1.5)
		projectile.Shape = Enum.PartType.Ball
		projectile.Color = data.color
		projectile.Material = Enum.Material.Neon
		projectile.Position = hrp.Position + hrp.CFrame.LookVector * 3 + Vector3.new(0, 1, 0)
		projectile.CanCollide = false
		
		local velocity = Instance.new("BodyVelocity")
		velocity.Velocity = hrp.CFrame.LookVector * 80
		velocity.MaxForce = Vector3.new(50000, 50000, 50000)
		velocity.Parent = projectile
		
		projectile.Parent = workspace
		
		-- Damage on hit
		projectile.Touched:Connect(function(hit)
			if hit:IsDescendantOf(character) then return end
			
			local humanoid = hit.Parent:FindFirstChild("Humanoid")
			if humanoid then
				humanoid:TakeDamage(data.damage)
				projectile:Destroy()
			elseif not hit:IsDescendantOf(character) then
				projectile:Destroy()
			end
		end)
		
		Debris:AddItem(projectile, 3)
	end)
	
	tool.Parent = player.Backpack
	print("Gave " .. data.ability .. " to " .. player.Name)
	
	-- Success message
	local msg = Instance.new("Message")
	msg.Text = "CONTRACT SIGNED: " .. data.name .. "\nCheck your backpack for " .. data.ability
	msg.Parent = player
	Debris:AddItem(msg, 3)
end)

-- Spawn spirits
CreateSpiritModel("EmberWisp", Vector3.new(0, 8, -20))
CreateSpiritModel("FrostShade", Vector3.new(20, 8, 0))

print("=== Spirit Contract System Loaded ===")