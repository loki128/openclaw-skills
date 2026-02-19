-- Spirit Contract System v2 - FIXED
-- Place this in ServerScriptService

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

-- Create remote event
local ContractEvent = Instance.new("RemoteEvent")
ContractEvent.Name = "ContractEvent"
ContractEvent.Parent = ReplicatedStorage

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
	glow.Brightness = 3
	glow.Range = 20
	glow.Parent = body
	
	-- PROXIMITY PROMPT (the Hold E thing that actually works)
	local prompt = Instance.new("ProximityPrompt")
	prompt.ActionText = "Sign Contract"
	prompt.ObjectText = spiritData.name
	prompt.HoldDuration = 0.5
	prompt.MaxActivationDistance = 15
	prompt.KeyboardKeyCode = Enum.KeyCode.E
	prompt.Parent = body
	
	-- Handle interaction
	prompt.Triggered:Connect(function(player)
		print(player.Name .. " triggered prompt for " .. spiritData.name)
		ContractEvent:FireClient(player, spiritKey, spiritData)
	end)
	
	-- Floating animation
	spawn(function()
		while npc.Parent do
			body.Position = position + Vector3.new(0, math.sin(tick() * 2) * 0.5, 0)
			body.Rotation = Vector3.new(0, tick() * 20, 0)
			wait(0.03)
		end
	end)
	
	npc.Parent = workspace
	print("Spawned " .. spiritData.name .. " at " .. tostring(position))
	return npc
end

-- Handle contract signing
ContractEvent.OnServerEvent:Connect(function(player, spiritKey, accept)
	print("Server received: " .. player.Name .. " wants to sign " .. tostring(spiritKey) .. " accept=" .. tostring(accept))
	
	if not accept then 
		print("Contract declined")
		return 
	end
	
	local spiritData = Spirits[spiritKey]
	if not spiritData then 
		print("ERROR: Spirit not found: " .. tostring(spiritKey))
		return 
	end
	
	-- Store contract
	PlayerContracts[player.UserId] = {
		spirit = spiritKey,
		data = spiritData,
		betrayed = false,
		contractsSigned = (PlayerContracts[player.UserId] and PlayerContracts[player.UserId].contractsSigned or 0) + 1
	}
	
	print("Contract stored for " .. player.Name)
	
	-- Give ability tool
	local tool = Instance.new("Tool")
	tool.Name = spiritData.ability
	tool.RequiresHandle = false
	
	-- Add ability script to tool
	tool.Activated:Connect(function()
		print(player.Name .. " used " .. spiritData.ability)
		
		-- Create projectile
		local character = player.Character
		if not character then return end
		
		local hrp = character:FindFirstChild("HumanoidRootPart")
		if not hrp then return end
		
		local projectile = Instance.new("Part")
		projectile.Name = spiritData.ability .. "Projectile"
		projectile.Size = Vector3.new(2, 2, 2)
		projectile.Shape = Enum.PartType.Ball
		projectile.Color = spiritData.color
		projectile.Material = Enum.Material.Neon
		projectile.Position = hrp.Position + hrp.CFrame.LookVector * 5 + Vector3.new(0, 2, 0)
		
		-- Velocity toward where player is looking
		local bv = Instance.new("BodyVelocity")
		bv.Velocity = hrp.CFrame.LookVector * 80
		bv.MaxForce = Vector3.new(50000, 50000, 50000)
		bv.Parent = projectile
		
		-- Trail effect
		local trail = Instance.new("Trail")
		trail.Color = ColorSequence.new(spiritData.color)
		trail.Lifetime = 0.5
		trail.Parent = projectile
		
		projectile.Parent = workspace
		
		-- Damage on touch
		projectile.Touched:Connect(function(hit)
			local humanoid = hit.Parent:FindFirstChild("Humanoid")
			if humanoid and hit.Parent ~= character then
				humanoid:TakeDamage(spiritData.damage)
				print("Hit " .. hit.Parent.Name .. " for " .. spiritData.damage .. " damage")
				projectile:Destroy()
			elseif hit.Parent ~= character and not hit:IsDescendantOf(character) then
				-- Hit wall/ground
				projectile:Destroy()
			end
		end)
		
		-- Cleanup after 3 seconds
		game:GetService("Debris"):AddItem(projectile, 3)
	end)
	
	tool.Parent = player.Backpack
	print("Gave " .. spiritData.ability .. " tool to " .. player.Name)
	
	-- Notify player it worked
	local successMsg = Instance.new("Message")
	successMsg.Text = "CONTRACT SIGNED: " .. spiritData.name:upper() .. "\nCheck your backpack for " .. spiritData.ability:upper()
	successMsg.Parent = player
	game:GetService("Debris"):AddItem(successMsg, 3)
end)

-- Spawn spirits
CreateSpiritNPC("EmberWisp", Vector3.new(0, 5, -20))
CreateSpiritNPC("FrostShade", Vector3.new(20, 5, 0))

print("=== Spirit Contract System v2 LOADED ===")
print("Walk up to spirits and HOLD E to sign contract")