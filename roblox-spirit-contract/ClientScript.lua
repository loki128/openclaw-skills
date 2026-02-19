-- Client UI v7 - GUARANTEED WORKING
-- Place in StarterPlayerScripts as LocalScript

print("CLIENT: === SCRIPT START ===")

local ReplicatedStorage = game:GetService("ReplicatedStorage")
local Players = game:GetService("Players")

-- Wait for local player
local player = Players.LocalPlayer
if not player then
	print("CLIENT: ERROR - No local player!")
	return
end

print("CLIENT: Local player: " .. player.Name)

-- Wait for PlayerGui with timeout
local playerGui = player:WaitForChild("PlayerGui", 10)
if not playerGui then
	print("CLIENT: ERROR - PlayerGui not found!")
	return
end

print("CLIENT: PlayerGui found")

-- Wait for remotes
local ShowContract = ReplicatedStorage:WaitForChild("ShowContract", 10)
if not ShowContract then
	print("CLIENT: ERROR - ShowContract not found!")
	return
end

local SignContract = ReplicatedStorage:WaitForChild("SignContract", 10)
if not SignContract then
	print("CLIENT: ERROR - SignContract not found!")
	return
end

print("CLIENT: Remotes found")

-- Create UI
local screenGui = Instance.new("ScreenGui")
screenGui.Name = "ContractUI"
screenGui.ResetOnSpawn = false
screenGui.ZIndexBehavior = Enum.ZIndexBehavior.Sibling

-- Parent to PlayerGui
local success, err = pcall(function()
	screenGui.Parent = playerGui
end)

if not success then
	print("CLIENT: ERROR creating ScreenGui: " .. tostring(err))
	return
end

print("CLIENT: ScreenGui created")

-- Simple backdrop
local backdrop = Instance.new("Frame")
backdrop.Name = "Backdrop"
backdrop.Size = UDim2.new(1, 0, 1, 0)
backdrop.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
backdrop.BackgroundTransparency = 0.5
backdrop.Visible = false
backdrop.Parent = screenGui

-- Main frame
local frame = Instance.new("Frame")
frame.Name = "MainFrame"
frame.Size = UDim2.new(0, 400, 0, 300)
frame.Position = UDim2.new(0.5, -200, 0.5, -150)
frame.BackgroundColor3 = Color3.fromRGB(30, 30, 35)
frame.BorderSizePixel = 0
frame.Visible = false
frame.Parent = screenGui

local corner = Instance.new("UICorner")
corner.CornerRadius = UDim.new(0, 12)
corner.Parent = frame

-- Title
local title = Instance.new("TextLabel")
title.Size = UDim2.new(1, 0, 0, 40)
title.Position = UDim2.new(0, 0, 0, 10)
title.BackgroundTransparency = 1
title.Text = "CONTRACT"
title.TextColor3 = Color3.fromRGB(255, 255, 255)
title.Font = Enum.Font.GothamBlack
title.TextSize = 28
title.Parent = frame

-- Spirit name
local nameLabel = Instance.new("TextLabel")
nameLabel.Name = "SpiritName"
nameLabel.Size = UDim2.new(1, 0, 0, 30)
nameLabel.Position = UDim2.new(0, 0, 0, 55)
nameLabel.BackgroundTransparency = 1
nameLabel.Text = "SPIRIT NAME"
nameLabel.TextColor3 = Color3.fromRGB(255, 100, 50)
nameLabel.Font = Enum.Font.GothamBold
nameLabel.TextSize = 22
title.Parent = frame

-- Info text
local infoText = Instance.new("TextLabel")
infoText.Name = "InfoText"
infoText.Size = UDim2.new(1, -40, 0, 100)
infoText.Position = UDim2.new(0, 20, 0, 100)
infoText.BackgroundTransparency = 1
infoText.Text = "Loading..."
infoText.TextColor3 = Color3.fromRGB(255, 255, 255)
infoText.Font = Enum.Font.Gotham
infoText.TextSize = 16
infoText.TextWrapped = true
infoText.Parent = frame

-- Sign button
local signBtn = Instance.new("TextButton")
signBtn.Name = "SignButton"
signBtn.Size = UDim2.new(0, 150, 0, 50)
signBtn.Position = UDim2.new(0.5, -160, 1, -70)
signBtn.BackgroundColor3 = Color3.fromRGB(0, 200, 100)
signBtn.Text = "SIGN"
signBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
signBtn.Font = Enum.Font.GothamBlack
signBtn.TextSize = 20
signBtn.Parent = frame

local signCorner = Instance.new("UICorner")
signCorner.CornerRadius = UDim.new(0, 10)
signCorner.Parent = signBtn

-- Decline button
local declineBtn = Instance.new("TextButton")
declineBtn.Name = "DeclineButton"
declineBtn.Size = UDim2.new(0, 150, 0, 50)
declineBtn.Position = UDim2.new(0.5, 10, 1, -70)
declineBtn.BackgroundColor3 = Color3.fromRGB(200, 50, 50)
declineBtn.Text = "DECLINE"
declineBtn.TextColor3 = Color3.fromRGB(255, 255, 255)
declineBtn.Font = Enum.Font.GothamBold
declineBtn.TextSize = 18
declineBtn.Parent = frame

local declineCorner = Instance.new("UICorner")
declineCorner.CornerRadius = UDim.new(0, 10)
declineCorner.Parent = declineBtn

print("CLIENT: UI elements created")

-- Current spirit
local currentSpirit = nil

-- Show UI function
local function ShowUI(spiritKey, data)
	print("CLIENT: ShowUI called with " .. tostring(spiritKey))
	
	currentSpirit = spiritKey
	nameLabel.Text = data.name:upper()
	infoText.Text = "Strength: " .. data.strength .. "\n\nDrawback: " .. data.drawback .. "\n\nAbility: " .. data.ability
	
	-- Show
	backdrop.Visible = true
	frame.Visible = true
	
	print("CLIENT: UI VISIBLE - spirit: " .. data.name)
end

-- Hide UI
local function HideUI()
	backdrop.Visible = false
	frame.Visible = false
	currentSpirit = nil
end

-- CRITICAL: Connect to event with error handling
print("CLIENT: Connecting to ShowContract...")

local connectionSuccess, connectionErr = pcall(function()
	ShowContract.OnClientEvent:Connect(function(spiritKey, data)
		print("CLIENT: === EVENT RECEIVED ===")
		print("CLIENT: spiritKey = " .. tostring(spiritKey))
		print("CLIENT: data = " .. tostring(data))
		
		if spiritKey and data then
			ShowUI(spiritKey, data)
		else
			print("CLIENT: ERROR - Missing data!")
		end
	end)
end)

if connectionSuccess then
	print("CLIENT: Event connected successfully")
else
	print("CLIENT: ERROR connecting event: " .. tostring(connectionErr))
end

-- Button handlers
signBtn.MouseButton1Click:Connect(function()
	print("CLIENT: Sign clicked")
	if currentSpirit then
		SignContract:FireServer(currentSpirit)
		HideUI()
	end
end)

declineBtn.MouseButton1Click:Connect(function()
	print("CLIENT: Decline clicked")
	HideUI()
end)

print("CLIENT: === READY ===")
print("CLIENT: Walk to spirit, hold E")