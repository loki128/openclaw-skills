-- Spirit Contract System v6 - DEBUG & FIX
-- Place this in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local Debris = game:GetService("Debris")

print("=== SERVER STARTING ===")

-- Create remote events
local ShowContract = Instance.new("RemoteEvent")
ShowContract.Name = "ShowContract"
ShowContract.Parent = ReplicatedStorage
print("ShowContract created")

local SignContract = Instance.new("RemoteEvent")
SignContract.Name = "SignContract"
SignContract.Parent = ReplicatedStorage
print("SignContract created")

-- Spirit data
local Spirits = {
	EmberWisp = {
		name = "Ember Wisp",
		element = "Fire",
		description = "A volatile spirit born from volcanic ash.",
		strength = "Burn damage over time",
		drawback = "Take 20% more water damage",
		ability = "Fireball",
		damage = 25,
		color = Color3.fromRGB(255, 80, 40),
		glowColor = Color3.fromRGB(255, 120, 60)
	},
	FrostShade = {
		name = "Frost Shade",
		element = "Ice", 
		description = "A spirit of frozen wastelands.",
		strength = "Slow enemies by 40%",
		drawback = "Move 15% slower",
		ability = "Ice Shard",
		damage = 20,
		color = Color3.fromRGB(80, 180, 255),
		glowColor = Color3.fromRGB(120, 200, 255)
	}
}

-- Create spirit
local function CreateSpirit(spiritKey, position)
	local data = Spirits[spiritKey]
	print("Creating spirit: " .. data.name)
	
	-- Model
	local model = Instance.new("Model")
	model.Name = data.name
	
	-- Core part
	local core = Instance.new("Part")
	core.Name = "Core"
	core.Shape = Enum.PartType.Ball
	core.Size = Vector3.new(3, 3, 3)
	core.Position = position
	core.Anchored = true
	core.Color = data.color
	core.Material = Enum.Material.Neon
	core.Transparency = 0.3
	core.Parent = model
	
	-- Light
	local light = Instance.new("PointLight")
	light.Color = data.glowColor
	light.Brightness = 3
	light.Range = 20
	light.Parent = core
	
	-- Name tag
	local billboard = Instance.new("BillboardGui")
	billboard.Size = UDim2.new(0, 200, 0, 40)
	billboard.StudsOffset = Vector3.new(0, 3.5, 0)
	billboard.AlwaysOnTop = true
	
	local label = Instance.new("TextLabel")
	label.Size = UDim2.new(1, 0, 1, 0)
	label.BackgroundTransparency = 1
	label.Text = data.name:upper()
	label.TextColor3 = data.glowColor
	label.Font = Enum.Font.GothamBlack
	label.TextSize = 18
	label.TextStrokeTransparency = 0
	label.Parent = billboard
	
	billboard.Parent = core
	
	-- CRITICAL: ProximityPrompt setup
	local prompt = Instance.new("ProximityPrompt")
	prompt.ActionText = "Sign Contract"
	prompt.ObjectText = data.name
	prompt.HoldDuration = 0.5
	prompt.MaxActivationDistance = 12
	prompt.KeyboardKeyCode = Enum.KeyCode.E
	prompt.RequiresLineOfSight = false
	prompt.Parent = core
	
	print("Prompt created for " .. data.name)
	
	-- CRITICAL: Prompt triggered event
	prompt.Triggered:Connect(function(player)
		print("=== PROMPT TRIGGERED ===")
		print("Player: " .. player.Name)
		print("Spirit: " .. spiritKey)
		
		-- CRITICAL: Fire to specific client
		local success, err = pcall(function()
			ShowContract:FireClient(player, spiritKey, data)
		end)
		
		if success then
			print("FireClient SUCCESS")
		else
			print("FireClient FAILED: " .. tostring(err))
		end
	end)
	
	-- Animation
	spawn(function()
		local t = 0
		while model.Parent do
			t = t + 0.03
			core.Position = position + Vector3.new(0, math.sin(t * 2) * 0.5, 0)
			core.Size = Vector3.new(3, 3, 3) * (1 + math.sin(t * 3) * 0.1)
			wait(0.03)
		end
	end)
	
	model.Parent = workspace
	print(data.name .. " spawned successfully")
end

-- Player data
local PlayerData = {}

-- Handle sign
SignContract.OnServerEvent:Connect(function(player, spiritKey)
	print("=== SIGN REQUEST ===")
	print("From: " .. player.Name)
	print("Spirit: " .. tostring(spiritKey))
	
	local data = Spirits[spiritKey]
	if not data then 
		print("ERROR: Invalid spirit")
		return 
	end
	
	-- Clear old tools
	for _, tool in pairs(player.Backpack:GetChildren()) do
		if tool:IsA("Tool") then tool:Destroy() end
	end
	if player.Character then
		for _, tool in pairs(player.Character:GetChildren()) do
			if tool:IsA("Tool") then tool:Destroy() end
		end
	end
	
	-- Create tool
	local tool = Instance.new("Tool")
	tool.Name = data.ability
	tool.RequiresHandle = false
	
	tool.Activated:Connect(function()
		local char = player.Character
		if not char then return end
		local hrp = char:FindFirstChild("HumanoidRootPart")
		if not hrp then return end
		
		local proj = Instance.new("Part")
		proj.Size = Vector3.new(1.5, 1.5, 1.5)
		proj.Shape = Enum.PartType.Ball
		proj.Color = data.color
		proj.Material = Enum.Material.Neon
		proj.Position = hrp.Position + hrp.CFrame.LookVector * 3 + Vector3.new(0, 1, 0)
		proj.CanCollide = false
		
		local vel = Instance.new("BodyVelocity")
		vel.Velocity = hrp.CFrame.LookVector * 80
		vel.MaxForce = Vector3.new(50000, 50000, 50000)
		vel.Parent = proj
		
		proj.Parent = workspace
		
		proj.Touched:Connect(function(hit)
			if hit:IsDescendantOf(char) then return end
			local hum = hit.Parent:FindFirstChild("Humanoid")
			if hum then
				hum:TakeDamage(data.damage)
				proj:Destroy()
			elseif not hit:IsDescendantOf(char) then
				proj:Destroy()
			end
		end)
		
		Debris:AddItem(proj, 3)
	end)
	
	tool.Parent = player.Backpack
	print("Tool given: " .. data.ability)
	
	-- Notify
	local msg = Instance.new("Message")
	msg.Text = "CONTRACT SIGNED: " .. data.name .. "\nAbility: " .. data.ability
	msg.Parent = player
	Debris:AddItem(msg, 3)
end)

-- Spawn
CreateSpirit("EmberWisp", Vector3.new(0, 6, -15))
CreateSpirit("FrostShade", Vector3.new(15, 6, 0))

print("=== SERVER READY ===")