-- Spirit Contract System v3 - DEBUG VERSION
-- Place this in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

print("=== SERVER SCRIPT STARTING ===")

-- Create remote event
local ContractEvent = Instance.new("RemoteEvent")
ContractEvent.Name = "ContractEvent"
ContractEvent.Parent = ReplicatedStorage
print("ContractEvent created")

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

print("Spirits defined: " .. tostring(#Spirits))

-- Player data
local PlayerContracts = {}

-- Create spirit NPC
local function CreateSpiritNPC(spiritKey, position)
	print("Creating spirit: " .. spiritKey)
	local spiritData = Spirits[spiritKey]
	
	if not spiritData then
		print("ERROR: Spirit not found: " .. spiritKey)
		return
	end
	
	-- Create model
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
	
	-- Glow
	local glow = Instance.new("PointLight")
	glow.Color = spiritData.color
	glow.Brightness = 3
	glow.Range = 20
	glow.Parent = body
	
	-- ProximityPrompt
	local prompt = Instance.new("ProximityPrompt")
	prompt.ActionText = "Sign Contract"
	prompt.ObjectText = spiritData.name
	prompt.HoldDuration = 0.5
	prompt.MaxActivationDistance = 15
	prompt.KeyboardKeyCode = Enum.KeyCode.E
	prompt.Parent = body
	
	print("Prompt created for " .. spiritData.name)
	
	-- Handle trigger
	prompt.Triggered:Connect(function(player)
		print("=== PROMPT TRIGGERED ===")
		print("Player: " .. player.Name)
		print("Spirit: " .. spiritKey)
		print("Firing RemoteEvent to client...")
		
		-- Send data to client
		ContractEvent:FireClient(player, spiritKey, spiritData)
		print("RemoteEvent fired!")
	end)
	
	-- Float animation
	spawn(function()
		while npc.Parent do
			body.Position = position + Vector3.new(0, math.sin(tick() * 2) * 0.5, 0)
			body.Rotation = Vector3.new(0, tick() * 20, 0)
			wait(0.03)
		end
	end)
	
	npc.Parent = workspace
	print("Spirit " .. spiritData.name .. " spawned at " .. tostring(position))
end

-- Handle contract signing
ContractEvent.OnServerEvent:Connect(function(player, spiritKey, accept)
	print("=== SERVER RECEIVED CONTRACT ===")
	print("Player: " .. player.Name)
	print("Spirit: " .. tostring(spiritKey))
	print("Accept: " .. tostring(accept))
	
	if not accept then 
		print("Contract declined")
		return 
	end
	
	local spiritData = Spirits[spiritKey]
	if not spiritData then 
		print("ERROR: Invalid spirit key")
		return 
	end
	
	-- Store contract
	PlayerContracts[player.UserId] = {
		spirit = spiritKey,
		data = spiritData,
		contractsSigned = (PlayerContracts[player.UserId] and PlayerContracts[player.UserId].contractsSigned or 0) + 1
	}
	
	print("Contract stored for " .. player.Name)
	
	-- Create tool
	local tool = Instance.new("Tool")
	tool.Name = spiritData.ability
	tool.RequiresHandle = false
	
	-- Tool functionality
	tool.Activated:Connect(function()
		local character = player.Character
		if not character then return end
		
		local hrp = character:FindFirstChild("HumanoidRootPart")
		if not hrp then return end
		
		-- Create projectile
		local projectile = Instance.new("Part")
		projectile.Size = Vector3.new(2, 2, 2)
		projectile.Shape = Enum.PartType.Ball
		projectile.Color = spiritData.color
		projectile.Material = Enum.Material.Neon
		projectile.Position = hrp.Position + hrp.CFrame.LookVector * 5 + Vector3.new(0, 2, 0)
		
		local bv = Instance.new("BodyVelocity")
		bv.Velocity = hrp.CFrame.LookVector * 80
		bv.MaxForce = Vector3.new(50000, 50000, 50000)
		bv.Parent = projectile
		
		projectile.Parent = workspace
		
		-- Damage
		projectile.Touched:Connect(function(hit)
			local humanoid = hit.Parent:FindFirstChild("Humanoid")
			if humanoid and hit.Parent ~= character then
				humanoid:TakeDamage(spiritData.damage)
				projectile:Destroy()
			elseif hit.Parent ~= character and not hit:IsDescendantOf(character) then
				projectile:Destroy()
			end
		end)
		
		game:GetService("Debris"):AddItem(projectile, 3)
	end)
	
	tool.Parent = player.Backpack
	print("Gave " .. spiritData.ability .. " to " .. player.Name)
end)

-- Spawn spirits
CreateSpiritNPC("EmberWisp", Vector3.new(0, 5, -20))
CreateSpiritNPC("FrostShade", Vector3.new(20, 5, 0))

print("=== SERVER SCRIPT LOADED ===")