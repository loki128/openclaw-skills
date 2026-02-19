-- Spirit Contract System v4 - COMPLETE WORKING VERSION
-- Place this in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")
local Debris = game:GetService("Debris")

-- Create remote events folder
local Remotes = Instance.new("Folder")
Remotes.Name = "SpiritRemotes"
Remotes.Parent = ReplicatedStorage

local ShowContract = Instance.new("RemoteEvent")
ShowContract.Name = "ShowContract"
ShowContract.Parent = Remotes

local SignContract = Instance.new("RemoteEvent")
SignContract.Name = "SignContract"
SignContract.Parent = Remotes

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
	},
	VoidWhisper = {
		name = "Void Whisper",
		element = "Dark",
		description = "An ancient entity from the spaces between stars. Dangerous and unpredictable.",
		strength = "Life steal 15% of damage dealt + teleport dash",
		drawback = "Lose 5% max health per minute while contracted",
		ability = "Void Bolt",
		damage = 35,
		cooldown = 3,
		color = Color3.fromRGB(120, 40, 180),
		glowColor = Color3.fromRGB(160, 60, 220),
		rarity = "Rare"
	}
}

-- Player data
local PlayerData = {}

-- Create detailed spirit model
local function CreateSpiritModel(spiritKey, position)
	local data = Spirits[spiritKey]
	
	-- Main model
	local model = Instance.new("Model")
	model.Name = data.name
	
	-- Core orb (center)
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
	
	-- Outer ring 1
	local ring1 = Instance.new("Part")
	ring1.Name = "Ring1"
	ring1.Shape = Enum.PartType.Cylinder
	ring1.Size = Vector3.new(0.5, 6, 6)
	ring1.Position = position
	ring1.Anchored = true
	ring1.Color = data.color
	ring1.Material = Enum.Material.Neon
	ring1.Transparency = 0.4
	ring1.Parent = model
	
	-- Outer ring 2 (rotated)
	local ring2 = ring1:Clone()
	ring2.Name = "Ring2"
	ring2.CFrame = CFrame.new(position) * CFrame.Angles(0, 0, math.rad(90))
	ring2.Parent = model
	
	-- Outer ring 3
	local ring3 = ring1:Clone()
	ring3.Name = "Ring3"
	ring3.CFrame = CFrame.new(position) * CFrame.Angles(0, math.rad(90), 0)
	ring3.Parent = model
	
	-- Glow light
	local light = Instance.new("PointLight")
	light.Color = data.glowColor
	light.Brightness = 5
	light.Range = 25
	light.Parent = core
	
	-- Particles
	local attachment = Instance.new("Attachment")
	attachment.Position = Vector3.new(0, 0, 0)
	attachment.Parent = core
	
	local particles = Instance.new("ParticleEmitter")
	particles.Color = ColorSequence.new(data.glowColor)
	particles.Size = NumberSequence.new(0.5, 0)
	particles.Transparency = NumberSequence.new(0, 1)
	particles.Lifetime = NumberRange.new(1, 2)
	particles.Rate = 20
	particles.Speed = NumberRange.new(2, 5)
	particles.Parent = attachment
	
	-- Name tag
	local billboard = Instance.new("BillboardGui")
	billboard.Size = UDim2.new(0, 200, 0, 80)
	billboard.StudsOffset = Vector3.new(0, 5, 0)
	billboard.AlwaysOnTop = true
	
	local nameLabel = Instance.new("TextLabel")
	nameLabel.Size = UDim2.new(1, 0, 0.5, 0)
	nameLabel.BackgroundTransparency = 1
	nameLabel.Text = data.name:upper()
	nameLabel.TextColor3 = data.glowColor
	nameLabel.Font = Enum.Font.GothamBlack
	nameLabel.TextSize = 20
	nameLabel.TextStrokeTransparency = 0
	nameLabel.Parent = billboard
	
	local rarityLabel = Instance.new("TextLabel")
	rarityLabel.Size = UDim2.new(1, 0, 0.5, 0)
	rarityLabel.Position = UDim2.new(0, 0, 0.5, 0)
	rarityLabel.BackgroundTransparency = 1
	rarityLabel.Text = "[" .. data.rarity:upper() .. "]"
	rarityLabel.TextColor3 = Color3.fromRGB(255, 215, 100)
	rarityLabel.Font = Enum.Font.GothamBold
	rarityLabel.TextSize = 14
	rarityLabel.Parent = billboard
	
	billboard.Parent = core
	
	-- Proximity prompt
	local prompt = Instance.new("ProximityPrompt")
	prompt.ActionText = "Sign Contract"
	prompt.ObjectText = data.name
	prompt.HoldDuration = 0.8
	prompt.MaxActivationDistance = 20
	prompt.KeyboardKeyCode = Enum.KeyCode.E
	prompt.GamepadKeyCode = Enum.KeyCode.ButtonX
	prompt.Parent = core
	
	-- Animation
	spawn(function()
		local time = 0
		while model.Parent do
			time = time + 0.03
			
			-- Float
			local floatY = math.sin(time * 2) * 0.8
			local basePos = position + Vector3.new(0, floatY, 0)
			
			-- Rotate rings at different speeds
			ring1.CFrame = CFrame.new(basePos) * CFrame.Angles(time, time * 0.5, 0)
			ring2.CFrame = CFrame.new(basePos) * CFrame.Angles(time * 0.7, time, time * 0.3)
			ring3.CFrame = CFrame.new(basePos) * CFrame.Angles(time * 0.3, time * 0.8, time)
			
			-- Pulse core
			local pulse = 1 + math.sin(time * 3) * 0.1
			core.Size = Vector3.new(3, 3, 3) * pulse
			core.Position = basePos
			
			wait(0.03)
		end
	end)
	
	-- Handle interaction
	prompt.Triggered:Connect(function(player)
		ShowContract:FireClient(player, spiritKey, data)
	end)
	
	model.Parent = workspace
	return model
end

-- Handle contract signing
SignContract.OnServerEvent:Connect(function(player, spiritKey)
	local data = Spirits[spiritKey]
	if not data then return end
	
	-- Initialize player data
	if not PlayerData[player.UserId] then
		PlayerData[player.UserId] = {
			contracts = {},
			activeContract = nil
		}
	end
	
	local pdata = PlayerData[player.UserId]
	
	-- Check if already has this contract
	if pdata.contracts[spiritKey] then
		-- Already have it, just equip
		pdata.activeContract = spiritKey
	else
		-- New contract
		pdata.contracts[spiritKey] = {
			signed = true,
			betrayed = false,
			loyalty = 100,
			contracts = 1
		}
		pdata.activeContract = spiritKey
	end
	
	-- Remove old tool if exists
	for _, tool in pairs(player.Backpack:GetChildren()) do
		if tool:IsA("Tool") then
			tool:Destroy()
		end
	end
	if player.Character then
		for _, tool in pairs(player.Character:GetChildren()) do
			if tool:IsA("Tool") then
				tool:Destroy()
			end
		end
	end
	
	-- Create ability tool
	local tool = Instance.new("Tool")
	tool.Name = data.ability
	tool.ToolTip = data.description
	tool.RequiresHandle = false
	
	-- Visual handle
	local handle = Instance.new("Part")
	handle.Name = "Handle"
	handle.Size = Vector3.new(0.5, 0.5, 2)
	handle.Color = data.color
	handle.Material = Enum.Material.Neon
	handle.Transparency = 0.5
	handle.CanCollide = false
	handle.Parent = tool
	
	local weld = Instance.new("Weld")
	weld.Part0 = handle
	weld.C0 = CFrame.new(0, 0, -1)
	weld.Parent = handle
	
	-- Ability cooldown
	local lastUse = 0
	
	tool.Activated:Connect(function()
		local now = tick()
		if now - lastUse < data.cooldown then
			return
		end
		lastUse = now
		
		local character = player.Character
		if not character then return end
		
		local hrp = character:FindFirstChild("HumanoidRootPart")
		if not hrp then return end
		
		-- Create projectile
		local projectile = Instance.new("Part")
		projectile.Name = data.ability
		projectile.Size = Vector3.new(1.5, 1.5, 1.5)
		projectile.Shape = Enum.PartType.Ball
		projectile.Color = data.color
		projectile.Material = Enum.Material.Neon
		projectile.Position = hrp.Position + hrp.CFrame.LookVector * 3 + Vector3.new(0, 1, 0)
		projectile.CanCollide = false
		
		-- Trail
		local attachment0 = Instance.new("Attachment")
		attachment0.Position = Vector3.new(0, 0, 0.5)
		attachment0.Parent = projectile
		
		local attachment1 = Instance.new("Attachment")
		attachment1.Position = Vector3.new(0, 0, -0.5)
		attachment1.Parent = projectile
		
		local trail = Instance.new("Trail")
		trail.Color = ColorSequence.new(data.glowColor)
		trail.Lifetime = 0.3
		trail.WidthScale = NumberSequence.new(1, 0)
		trail.Attachment0 = attachment0
		trail.Attachment1 = attachment1
		trail.Parent = projectile
		
		-- Velocity
		local velocity = Instance.new("LinearVelocity")
		velocity.MaxForce = math.huge
		velocity.VectorVelocity = hrp.CFrame.LookVector * 120
		velocity.Parent = projectile
		
		projectile.Parent = workspace
		
		-- Impact
		local connection
		connection = projectile.Touched:Connect(function(hit)
			if hit:IsDescendantOf(character) then return end
			
			local humanoid = hit.Parent:FindFirstChild("Humanoid")
			if humanoid then
				humanoid:TakeDamage(data.damage)
				
				-- Apply effect based on element
				if data.element == "Fire" then
					-- Burn effect (damage over time)
					spawn(function()
						for i = 1, 3 do
							wait(1)
							if humanoid and humanoid.Parent then
								humanoid:TakeDamage(5)
							end
						end
					end)
				elseif data.element == "Ice" then
					-- Slow effect
					local originalSpeed = humanoid.WalkSpeed
					humanoid.WalkSpeed = originalSpeed * 0.6
					wait(3)
					if humanoid and humanoid.Parent then
						humanoid.WalkSpeed = originalSpeed
					end
				end
			end
			
			-- Impact effect
			local explosion = Instance.new("ParticleEmitter")
			explosion.Color = ColorSequence.new(data.glowColor)
			explosion.Size = NumberSequence.new(2, 0)
			explosion.Lifetime = NumberRange.new(0.5)
			explosion.Rate = 0
			explosion.BurstCount = 20
			explosion.Speed = NumberRange.new(10, 30)
			explosion.Parent = projectile
			
			explosion:Emit(20)
			
			projectile.CanCollide = false
			projectile.Transparency = 1
			
			wait(0.5)
			projectile:Destroy()
			if connection then connection:Disconnect() end
		end)
		
		Debris:AddItem(projectile, 5)
	end)
	
	tool.Parent = player.Backpack
	
	-- Notify
	local gui = Instance.new("ScreenGui")
	gui.Name = "ContractSuccess"
	
	local frame = Instance.new("Frame")
	frame.Size = UDim2.new(0, 400, 0, 150)
	frame.Position = UDim2.new(0.5, -200, 0, -200)
	frame.BackgroundColor3 = Color3.fromRGB(20, 20, 25)
	frame.BorderSizePixel = 0
	frame.Parent = gui
	
	local corner = Instance.new("UICorner")
	corner.CornerRadius = UDim.new(0, 12)
	corner.Parent = frame
	
	local stroke = Instance.new("UIStroke")
	stroke.Color = data.glowColor
	stroke.Thickness = 2
	stroke.Parent = frame
	
	local title = Instance.new("TextLabel")
	title.Size = UDim2.new(1, 0, 0.4, 0)
	title.BackgroundTransparency = 1
	title.Text = "CONTRACT SIGNED"
	title.TextColor3 = Color3.fromRGB(100, 255, 100)
	title.Font = Enum.Font.GothamBlack
	title.TextSize = 28
	title.Parent = frame
	
	local subtitle = Instance.new("TextLabel")
	subtitle.Size = UDim2.new(1, 0, 0.3, 0)
	subtitle.Position = UDim2.new(0, 0, 0.4, 0)
	subtitle.BackgroundTransparency = 1
	subtitle.Text = data.name
	subtitle.TextColor3 = data.glowColor
	subtitle.Font = Enum.Font.GothamBold
	subtitle.TextSize = 22
	subtitle.Parent = frame
	
	local info = Instance.new("TextLabel")
	info.Size = UDim2.new(1, 0, 0.3, 0)
	info.Position = UDim2.new(0, 0, 0.7, 0)
	info.BackgroundTransparency = 1
	info.Text = "Ability: " .. data.ability .. " | Press 1 to equip"
	info.TextColor3 = Color3.fromRGB(200, 200, 200)
	info.Font = Enum.Font.Gotham
	info.TextSize = 14
	info.Parent = frame
	
	gui.Parent = player.PlayerGui
	
	-- Animate in
	frame.Position = UDim2.new(0.5, -200, 0, -200)
	wait(0.1)
	frame:TweenPosition(UDim2.new(0.5, -200, 0, 50), Enum.EasingDirection.Out, Enum.EasingStyle.Back, 0.5)
	
	wait(4)
	frame:TweenPosition(UDim2.new(0.5, -200, 0, -200), Enum.EasingDirection.In, Enum.EasingStyle.Quad, 0.3)
	wait(0.3)
	gui:Destroy()
end)

-- Spawn spirits in world
CreateSpiritModel("EmberWisp", Vector3.new(0, 8, -25))
CreateSpiritModel("FrostShade", Vector3.new(30, 8, 0))
CreateSpiritModel("VoidWhisper", Vector3.new(-30, 10, 0))

print("=== Spirit Contract System v4 LOADED ===")
print("3 spirits spawned. Walk up and hold E to contract.")