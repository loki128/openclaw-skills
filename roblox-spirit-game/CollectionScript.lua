-- CollectionScript LocalScript
-- Put this in StarterPlayerScripts

local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local UserInputService = game:GetService("UserInputService")

local LocalPlayer = Players.LocalPlayer
local CollectSpiritEvent = ReplicatedStorage:WaitForChild("Events"):WaitForChild("CollectSpirit")
local SpiritFolder = workspace:WaitForChild("SpiritFolder")

local COLLECTION_RANGE = 10 -- studs

-- Function to check distance and collect
local function CheckCollection()
	local character = LocalPlayer.Character
	if not character then return end
	
	local humanoidRootPart = character:FindFirstChild("HumanoidRootPart")
	if not humanoidRootPart then return end
	
	local playerPos = humanoidRootPart.Position
	
	-- Check all spirits
	for _, spirit in ipairs(SpiritFolder:GetChildren()) do
		if spirit:IsA("BasePart") then
			local hitbox = spirit:FindFirstChild("CollectionHitbox")
			if hitbox then
				local distance = (hitbox.Position - playerPos).Magnitude
				if distance <= COLLECTION_RANGE then
					-- Collect the spirit
					CollectSpiritEvent:FireServer(spirit)
					
					-- Visual feedback
					local data = require(ReplicatedStorage.SpiritData)[spirit:GetAttribute("SpiritId")]
					if data then
						print("Collected: " .. data.Name .. " (" .. data.Rarity .. ")")
					end
				end
			end
		end
	end
end

-- Check every frame
while true do
	wait(0.1)
	CheckCollection()
end
